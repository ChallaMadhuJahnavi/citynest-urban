/**
 * CityNest Settlement Checklist Page
 */

import { html } from '../html.js';
import { Icon } from '../components/Icon.js';

export function ChecklistPage({
  checklistItems,
  onToggleChecklistItem,
  onAddChecklistItem,
  onDeleteChecklistItem,
  onResetChecklist
}) {
  const [filterStatus, setFilterStatus] = React.useState('all'); // 'all', 'pending', 'completed'
  const [filterCategory, setFilterCategory] = React.useState('all');
  const [showAddForm, setShowAddForm] = React.useState(false);

  // New task form state
  const [taskTitle, setTaskTitle] = React.useState('');
  const [taskDesc, setTaskDesc] = React.useState('');
  const [taskCat, setTaskCat] = React.useState('housing');
  const [taskPriority, setTaskPriority] = React.useState('medium');
  const [taskDueDays, setTaskDueDays] = React.useState(7);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'housing', label: 'Housing' },
    { id: 'utilities', label: 'Utilities' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'transport', label: 'Transport' },
    { id: 'finance', label: 'Finance & Tax' },
    { id: 'social', label: 'Social & Culture' },
    { id: 'legal', label: 'Legal & ID' }
  ];

  const totalTasks = checklistItems.length;
  const completedTasks = checklistItems.filter(i => i.is_completed).length;
  const percentComplete = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Trigger celebratory confetti on 100%
  React.useEffect(() => {
    if (percentComplete === 100 && totalTasks > 0 && typeof confetti === 'function') {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.warn('Confetti error:', e);
      }
    }
  }, [percentComplete, totalTasks]);

  // Filter tasks
  const filteredItems = checklistItems.filter(item => {
    if (filterStatus === 'pending' && item.is_completed) return false;
    if (filterStatus === 'completed' && !item.is_completed) return false;
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    return true;
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    onAddChecklistItem({
      title: taskTitle.trim(),
      description: taskDesc.trim(),
      category: taskCat,
      priority: taskPriority,
      due_days: Number(taskDueDays) || 7
    });

    setTaskTitle('');
    setTaskDesc('');
    setTaskCat('housing');
    setTaskPriority('medium');
    setTaskDueDays(7);
    setShowAddForm(false);
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'low': return 'bg-slate-100 text-slate-700 border-slate-200';
      case 'medium': default: return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'housing': return 'Home';
      case 'utilities': return 'Zap';
      case 'healthcare': return 'HeartPulse';
      case 'transport': return 'Train';
      case 'finance': return 'DollarSign';
      case 'social': return 'Users';
      case 'legal': default: return 'ShieldCheck';
    }
  };

  return html`
    <div className="space-y-6 animate-fade-in pb-12">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900">
            Settlement Checklist
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track key administrative, residential, and social milestones to smoothly settle into your new city.
          </p>
        </div>

        <button
          onClick=${() => setShowAddForm(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <${Icon} name="Plus" className="w-4 h-4" />
          <span>Add Custom Task</span>
        </button>
      </div>

      
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-blue-300">Overall Progress</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-white">${percentComplete}%</span>
              <span className="text-xs text-blue-200">
                (${completedTasks} of ${totalTasks} milestones achieved)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            ${percentComplete === 100 ? html`
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
                <${Icon} name="CheckCheck" className="w-4 h-4" />
                <span>Fully Settled!</span>
              </span>
            ` : html`
              <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                ${totalTasks - completedTasks} Tasks Pending
              </span>
            `}
          </div>
        </div>

        
        <div className="w-full bg-slate-800/80 rounded-full h-3.5 overflow-hidden p-0.5 border border-slate-700">
          <div
            className="bg-gradient-to-r from-blue-500 via-indigo-400 to-emerald-400 h-2.5 rounded-full transition-all duration-700 ease-out shadow-sm"
            style=${{ width: `${percentComplete}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between mt-3 text-[11px] text-blue-200/80">
          <span>Move-In Preparation</span>
          <span>Legal & ID Setup</span>
          <span>Community Integration</span>
        </div>
      </div>

      
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        
        <div className="flex items-center gap-1.5 w-full md:w-auto">
          ${[
      { id: 'all', label: 'All Tasks', count: totalTasks },
      { id: 'pending', label: 'Pending', count: totalTasks - completedTasks },
      { id: 'completed', label: 'Completed', count: completedTasks }
    ].map(status => html`
            <button
              key=${status.id}
              onClick=${() => setFilterStatus(status.id)}
              className=${`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${filterStatus === status.id
        ? 'bg-blue-600 text-white shadow-xs'
        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
            >
              <span>${status.label}</span>
              <span className=${`px-1.5 py-0.2 rounded-full text-[10px] ${filterStatus === status.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
      }`}>
                ${status.count}
              </span>
            </button>
          `)}
        </div>

        
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <select
            value=${filterCategory}
            onChange=${(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            ${categories.map(cat => html`
              <option key=${cat.id} value=${cat.id}>${cat.label}</option>
            `)}
          </select>

          <button
            onClick=${onResetChecklist}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="Reset to default starter tasks"
          >
            <${Icon} name="RotateCcw" className="w-4 h-4" />
          </button>
        </div>
      </div>

      
      ${filteredItems.length > 0 ? html`
        <div className="space-y-3">
          ${filteredItems.map(item => html`
            <div
              key=${item.id}
              className=${`p-4 sm:p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${item.is_completed
          ? 'bg-slate-50/70 border-slate-200 opacity-80'
          : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
        }`}
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                
                <button
                  onClick=${() => onToggleChecklistItem(item.id)}
                  className=${`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 ${item.is_completed
          ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
          : 'border-slate-300 hover:border-blue-600 bg-white'
        }`}
                  aria-label="Toggle completed"
                >
                  ${item.is_completed ? html`<${Icon} name="Check" className="w-4 h-4" />` : null}
                </button>

                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      <${Icon} name=${getCategoryIcon(item.category)} className="w-3 h-3" />
                      <span>${item.category}</span>
                    </span>

                    
                    <span className=${`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border ${getPriorityStyle(item.priority)}`}>
                      ${item.priority} Priority
                    </span>

                    
                    ${item.due_days != null ? html`
                      <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                        <${Icon} name="Clock" className="w-3 h-3 text-slate-400" />
                        <span>Due in ~${item.due_days} days</span>
                      </span>
                    ` : null}
                  </div>

                  <h3 className=${`text-sm sm:text-base font-bold text-slate-900 transition-all ${item.is_completed ? 'line-through text-slate-500' : ''
        }`}>
                    ${item.title}
                  </h3>

                  ${item.description ? html`
                    <p className=${`text-xs mt-1 leading-relaxed ${item.is_completed ? 'text-slate-400 line-through' : 'text-slate-600'
          }`}>
                      ${item.description}
                    </p>
                  ` : null}
                </div>
              </div>

              
              <button
                onClick=${() => onDeleteChecklistItem(item.id)}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                title="Delete task"
              >
                <${Icon} name="Trash2" className="w-4 h-4" />
              </button>
            </div>
          `)}
        </div>
      ` : html`
        
        <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <${Icon} name="CheckSquare" className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No tasks in this view</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try switching filters or click "Add Custom Task" to add your own personal settlement item.
          </p>
        </div>
      `}

      
      ${showAddForm ? html`
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm modal-overlay">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden modal-content animate-slide-down">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <${Icon} name="Plus" className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Add Settlement Task</h3>
              </div>
              <button
                onClick=${() => setShowAddForm(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <${Icon} name="X" className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit=${handleAddTask} className="p-5 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule elevator reservation for move-in day"
                  value=${taskTitle}
                  onInput=${(e) => setTaskTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Description / Notes</label>
                <textarea
                  rows="2"
                  placeholder="Additional details, phone numbers, or links..."
                  value=${taskDesc}
                  onInput=${(e) => setTaskDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-600"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Category</label>
                  <select
                    value=${taskCat}
                    onChange=${(e) => setTaskCat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
                  >
                    <option value="housing">Housing</option>
                    <option value="utilities">Utilities</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="transport">Transport</option>
                    <option value="finance">Finance</option>
                    <option value="social">Social</option>
                    <option value="legal">Legal</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Priority</label>
                  <select
                    value=${taskPriority}
                    onChange=${(e) => setTaskPriority(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Due In (Days)</label>
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value=${taskDueDays}
                    onInput=${(e) => setTaskDueDays(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick=${() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      ` : null}
    </div>
  `;
}
