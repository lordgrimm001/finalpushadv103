"use client"

import { Mail, Linkedin, Github, Heart } from "lucide-react"

export default function FooterSection() {
  return (
    <footer className="relative w-full bg-background border-t border-purple-500/20">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">About</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A neural pathway connecting technology, service, and innovation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {["Explore", "Skills", "Gallery", "Contact"].map((link) => (
                <li key={link}>
                  <button className="text-gray-400 hover:text-purple-400 transition-colors">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Connect</h3>
            <div className="flex gap-3">
              <button className="w-10 h-10 glass glass-hover rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-purple-400" />
              </button>
              <button className="w-10 h-10 glass glass-hover rounded-full flex items-center justify-center">
                <Linkedin className="w-4 h-4 text-purple-400" />
              </button>
              <button className="w-10 h-10 glass glass-hover rounded-full flex items-center justify-center">
                <Github className="w-4 h-4 text-purple-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0 mb-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2025 Francis Xavier C. Baclao. Built with neural pathways.</p>
          <p className="flex items-center gap-2 mt-4 md:mt-0">
            Made with <Heart className="w-4 h-4 text-red-500" /> and code
          </p>
        </div>
      </div>
    </footer>
  )
}
