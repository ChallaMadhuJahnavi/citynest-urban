/**
 * CityNest Main Application Root
 */

import { html } from './html.js';
import { db } from './store.js';
import { sortByProximity, NYC_PRESET_LOCATIONS } from './geo.js';
import { showToast, ToastContainer } from './components/Toast.js';
import { Sidebar } from './components/Sidebar.js';
import { MobileNav } from './components/MobileNav.js';
import { AuthModal } from './components/AuthModal.js';
import { SaveNotesModal } from './components/SaveNotesModal.js';
import { HousingModal } from './components/HousingModal.js';
import { EventModal } from './components/EventModal.js';

import { Dashboard } from './pages/Dashboard.js';
import { HousingPage } from './pages/HousingPage.js';
import { EventsPage } from './pages/EventsPage.js';
import { ChecklistPage } from './pages/ChecklistPage.js';
import { CityServicesPage } from './pages/CityServicesPage.js';
import { WellnessPage } from './pages/WellnessPage.js';
import { SavedPage } from './pages/SavedPage.js';

export function App() {
  // Navigation State
  const [activePage, setActivePage] = React.useState('dashboard');

  // User Auth State
  const [currentUser, setCurrentUser] = React.useState(() => db.getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

  // Database Data State
  const [housingListings, setHousingListings] = React.useState(() => db.getHousingListings());
  const [communityEvents, setCommunityEvents] = React.useState(() => db.getCommunityEvents());
  const [checklistItems, setChecklistItems] = React.useState(() => db.getChecklistItems());
  const [savedResources, setSavedResources] = React.useState(() => db.getUserSavedResources(currentUser.id));
  const [cityServices] = React.useState(() => db.getCityServices());
  const [wellnessResources] = React.useState(() => db.getWellnessResources());
  const [dailyAffirmations] = React.useState(() => db.getDailyAffirmations());

  // Location & Geolocation State
  const [locationState, setLocationState] = React.useState({
    status: 'idle', // 'idle' | 'loading' | 'granted' | 'denied' | 'error'
    coords: null,   // { lat, lng }
    locationName: null,
    errorMessage: null
  });

  // Modals State
  const [selectedHousing, setSelectedHousing] = React.useState(null);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [saveNotesTarget, setSaveNotesTarget] = React.useState(null); // { type, id, title, isSaved }

  // Subscribe to DB changes & refresh state
  React.useEffect(() => {
    const unsubscribe = db.subscribe(() => {
      const user = db.getCurrentUser();
      setCurrentUser(user);
      setHousingListings(db.getHousingListings());
      setCommunityEvents(db.getCommunityEvents());
      setChecklistItems(db.getChecklistItems());
      setSavedResources(db.getUserSavedResources(user.id));
    });
    return unsubscribe;
  }, []);

  // Update saved items when user changes
  React.useEffect(() => {
    setSavedResources(db.getUserSavedResources(currentUser.id));
  }, [currentUser]);

  // Calculate settlement checklist stats
  const checklistStats = React.useMemo(() => {
    const total = checklistItems.length;
    const completed = checklistItems.filter(i => i.is_completed).length;
    const pending = total - completed;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, percent };
  }, [checklistItems]);

  // Set of saved resource IDs for quick card status checks
  const savedResourceIds = React.useMemo(() => {
    return new Set(savedResources.map(s => s.resource_id));
  }, [savedResources]);

  // Housing listings sorted with current location
  const sortedHousing = React.useMemo(() => {
    return sortByProximity(housingListings, locationState.coords);
  }, [housingListings, locationState.coords]);

  // Community events sorted with current location
  const sortedEvents = React.useMemo(() => {
    return sortByProximity(communityEvents, locationState.coords);
  }, [communityEvents, locationState.coords]);

  // Geolocation Handler
  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setLocationState({
        status: 'denied',
        coords: null,
        locationName: null,
        errorMessage: 'Geolocation is not supported by your browser.'
      });
      showToast('Geolocation not supported in browser', 'warning');
      return;
    }

    setLocationState(prev => ({ ...prev, status: 'loading', errorMessage: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setLocationState({
          status: 'granted',
          coords,
          locationName: 'Live Device GPS',
          errorMessage: null
        });
        showToast('Live device location enabled! Listings sorted by proximity.', 'success');
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setLocationState({
          status: 'denied',
          coords: null,
          locationName: null,
          errorMessage: error.message || 'Permission to access location was denied.'
        });
        showToast('Location permission denied. Select an NYC area from presets.', 'warning');
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  };

  // Preset Location Selection Handler
  const handleSelectPresetLocation = (preset) => {
    setLocationState({
      status: 'granted',
      coords: { lat: preset.lat, lng: preset.lng },
      locationName: preset.name,
      errorMessage: null
    });
    showToast(`Location set to ${preset.name}`, 'success');
  };

  const handleResetLocation = () => {
    setLocationState({
      status: 'idle',
      coords: null,
      locationName: null,
      errorMessage: null
    });
    showToast('Location reset to default view', 'info');
  };

  // Auth Handlers
  const handleSelectUser = (user) => {
    db.setCurrentUser(user);
    showToast(`Switched profile to ${user.name}`, 'info');
  };

  const handleLoginEmail = (email, name) => {
    const user = db.loginOrRegister(email, name);
    showToast(`Welcome, ${user.name}!`, 'success');
  };

  // Checklist Actions
  const handleToggleChecklist = (id) => {
    const item = db.toggleChecklistItem(id);
    if (item && item.is_completed) {
      showToast(`Completed: ${item.title}`, 'success');
    }
  };

  const handleAddChecklist = (newTask) => {
    db.addChecklistItem(newTask);
    showToast('New settlement task added!', 'success');
  };

  const handleDeleteChecklist = (id) => {
    db.deleteChecklistItem(id);
    showToast('Task removed from checklist', 'info');
  };

  const handleResetChecklist = () => {
    db.resetChecklistToDefault();
    showToast('Checklist reset to default starter tasks', 'info');
  };

  // Event RSVP Action
  const handleToggleRSVP = (eventId) => {
    const result = db.toggleEventRSVP(eventId, currentUser);
    if (result.success) {
      if (result.isAttending) {
        showToast(`RSVP Confirmed for ${result.event.title}!`, 'success');
      } else {
        showToast(`RSVP Cancelled for ${result.event.title}`, 'info');
      }
    } else {
      showToast(result.message, 'warning');
    }
  };

  // Bookmark / Saved Resources Actions
  const handleSaveResourceWithNotes = (notes) => {
    if (!saveNotesTarget) return;

    db.saveResource({
      userId: currentUser.id,
      resourceType: saveNotesTarget.type,
      resourceId: saveNotesTarget.id,
      title: saveNotesTarget.title,
      notes: notes || ''
    });

    showToast(`Saved "${saveNotesTarget.title}" to My Resources`, 'success');
    setSaveNotesTarget(null);
  };

  const handleRemoveSavedTarget = () => {
    if (!saveNotesTarget) return;
    db.removeSavedByResource(currentUser.id, saveNotesTarget.type, saveNotesTarget.id);
    showToast('Resource removed from bookmarks', 'info');
    setSaveNotesTarget(null);
  };

  const handleRemoveSavedDirect = (savedId) => {
    db.removeSavedResource(savedId, currentUser.id);
    showToast('Bookmark removed', 'info');
  };

  const handleUpdateSavedNotes = (savedId, newNotes) => {
    db.updateSavedNotes(savedId, currentUser.id, newNotes);
    showToast('Notes updated', 'success');
  };

  return html`
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row font-sans antialiased">
      <${ToastContainer} />

      <${Sidebar}
        activePage=${activePage}
        setActivePage=${setActivePage}
        currentUser=${currentUser}
        onOpenAuth=${() => setIsAuthModalOpen(true)}
        locationState=${locationState}
        savedCount=${savedResources.length}
        checklistStats=${checklistStats}
      />

      <${MobileNav}
        activePage=${activePage}
        setActivePage=${setActivePage}
        currentUser=${currentUser}
        onOpenAuth=${() => setIsAuthModalOpen(true)}
        locationState=${locationState}
        savedCount=${savedResources.length}
        checklistStats=${checklistStats}
      />

      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        ${activePage === 'dashboard' ? html`
          <${Dashboard}
            currentUser=${currentUser}
            onNavigate=${setActivePage}
            checklistItems=${checklistItems}
            onToggleChecklistItem=${handleToggleChecklist}
            communityEvents=${sortedEvents}
            housingListings=${sortedHousing}
            locationState=${locationState}
            savedCount=${savedResources.length}
            onOpenEventModal=${(event) => setSelectedEvent(event)}
            onOpenHousingModal=${(housing) => setSelectedHousing(housing)}
          />
        ` : null}

        ${activePage === 'housing' ? html`
          <${HousingPage}
            housingListings=${sortedHousing}
            locationState=${locationState}
            onRequestLocation=${handleRequestLocation}
            onSelectPreset=${handleSelectPresetLocation}
            onResetLocation=${handleResetLocation}
            onOpenHousingModal=${(listing) => setSelectedHousing(listing)}
            onOpenSaveNotesModal=${(target) => setSaveNotesTarget(target)}
            savedResourceIds=${savedResourceIds}
          />
        ` : null}

        ${activePage === 'events' ? html`
          <${EventsPage}
            communityEvents=${sortedEvents}
            currentUser=${currentUser}
            locationState=${locationState}
            onRequestLocation=${handleRequestLocation}
            onSelectPreset=${handleSelectPresetLocation}
            onResetLocation=${handleResetLocation}
            onOpenEventModal=${(event) => setSelectedEvent(event)}
            onToggleRSVP=${handleToggleRSVP}
            onOpenSaveNotesModal=${(target) => setSaveNotesTarget(target)}
            savedResourceIds=${savedResourceIds}
          />
        ` : null}

        ${activePage === 'checklist' ? html`
          <${ChecklistPage}
            checklistItems=${checklistItems}
            onToggleChecklistItem=${handleToggleChecklist}
            onAddChecklistItem=${handleAddChecklist}
            onDeleteChecklistItem=${handleDeleteChecklist}
            onResetChecklist=${handleResetChecklist}
          />
        ` : null}

        ${activePage === 'services' ? html`
          <${CityServicesPage}
            cityServices=${cityServices}
            onOpenSaveNotesModal=${(target) => setSaveNotesTarget(target)}
            savedResourceIds=${savedResourceIds}
          />
        ` : null}

        ${activePage === 'wellness' ? html`
          <${WellnessPage}
            wellnessResources=${wellnessResources}
            dailyAffirmations=${dailyAffirmations}
            onOpenSaveNotesModal=${(target) => setSaveNotesTarget(target)}
            savedResourceIds=${savedResourceIds}
          />
        ` : null}

        ${activePage === 'saved' ? html`
          <${SavedPage}
            currentUser=${currentUser}
            savedResources=${savedResources}
            onRemoveSaved=${handleRemoveSavedDirect}
            onUpdateNotes=${handleUpdateSavedNotes}
            onNavigate=${setActivePage}
            onOpenHousingModal=${(listing) => setSelectedHousing(listing)}
            onOpenEventModal=${(event) => setSelectedEvent(event)}
            housingListings=${housingListings}
            communityEvents=${communityEvents}
          />
        ` : null}
      </main>

      <${AuthModal}
        isOpen=${isAuthModalOpen}
        onClose=${() => setIsAuthModalOpen(false)}
        currentUser=${currentUser}
        onSelectUser=${handleSelectUser}
        onLoginEmail=${handleLoginEmail}
      />

      <${HousingModal}
        isOpen=${!!selectedHousing}
        onClose=${() => setSelectedHousing(null)}
        listing=${selectedHousing}
        isSaved=${selectedHousing ? savedResourceIds.has(selectedHousing.id) : false}
        onToggleSave=${(listing) => {
          setSaveNotesTarget({
            type: 'housing',
            id: listing.id,
            title: listing.title,
            isSaved: savedResourceIds.has(listing.id)
          });
        }}
        onContactAgent=${(listing) => {
          showToast(`Inquiry sent to leasing agent at ${listing.contact_email}`, 'success');
        }}
      />

      <${EventModal}
        isOpen=${!!selectedEvent}
        onClose=${() => setSelectedEvent(null)}
        event=${selectedEvent}
        currentUser=${currentUser}
        isSaved=${selectedEvent ? savedResourceIds.has(selectedEvent.id) : false}
        onToggleSave=${(event) => {
          setSaveNotesTarget({
            type: 'event',
            id: event.id,
            title: event.title,
            isSaved: savedResourceIds.has(event.id)
          });
        }}
        onToggleRSVP=${(eventId) => {
          handleToggleRSVP(eventId);
          setSelectedEvent(db.getEventById(eventId));
        }}
      />

      <${SaveNotesModal}
        isOpen=${!!saveNotesTarget}
        onClose=${() => setSaveNotesTarget(null)}
        resource=${saveNotesTarget}
        isSaved=${saveNotesTarget ? saveNotesTarget.isSaved : false}
        existingNotes=${
          saveNotesTarget 
            ? (savedResources.find(s => s.resource_id === saveNotesTarget.id)?.notes || '') 
            : ''
        }
        onSave=${handleSaveResourceWithNotes}
        onRemove=${handleRemoveSavedTarget}
      />
    </div>
  `;
}

// Mount the App
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(React.createElement(App));
}
