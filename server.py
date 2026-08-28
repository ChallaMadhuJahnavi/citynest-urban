#!/usr/bin/env python3
"""
CityNest Local Development Server
Serves static assets with appropriate MIME types for ES modules.
"""

import http.server
import socketserver
import os
import sys

# Force UTF-8 stdout if needed
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

PORT = 3000

class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.html': 'text/html; charset=utf-8'
    }

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

def run():
    cur_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(cur_dir)
    socketserver.TCPServer.allow_reuse_address = True
    
    server_cls = getattr(http.server, 'ThreadingHTTPServer', http.server.HTTPServer)
    with server_cls(("127.0.0.1", PORT), Handler) as httpd:
        print(f"CityNest local server is running at: http://localhost:{PORT}")
        print("Press Ctrl+C to stop.")
        sys.stdout.flush()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("Shutting down server.")
            httpd.server_close()

if __name__ == '__main__':
    run()
