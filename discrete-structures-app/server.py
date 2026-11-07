#!/usr/bin/env python3
"""
Diskret Tuzilmalar Ilovasi uchun Mahalliy Server.
Hech qanday qo'shimcha kutubxona talab qilmaydi (Faqat standart Python).
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 5500

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and caching headers for smooth dev experience
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    port = PORT
    for attempt in range(10):
        try:
            with socketserver.TCPServer(("", port), Handler) as httpd:
                url = f"http://localhost:{port}"
                print("=" * 65)
                print(" ✨ DISKRET TUZILMALARI FANIDAN INTERAKTIV DASTUR ISHGA TUSHDI! ✨ ")
                print("=" * 65)
                print(f" 🌐 Brauzerda oching: {url}")
                print(f" 📁 Loyiha papkasi : {os.getcwd()}")
                print(" 🛑 To'xtatish uchun : Ctrl + C bosing")
                print("=" * 65)
                
                try:
                    webbrowser.open(url)
                except Exception:
                    pass
                    
                httpd.serve_forever()
                break
        except OSError:
            port += 1

if __name__ == '__main__':
    run()
