'use client'

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useRef } from 'react';

type ThemeToggleProps = {
    forMobile?: boolean;
}

const ThemeToggle = ({ forMobile = false }: ThemeToggleProps) => {
    const { toggleTheme, isDark } = useTheme();
    const btnRef = useRef<HTMLButtonElement>(null);

    function handleClick() {
        const btn = btnRef.current;
        if (!btn) { toggleTheme(); return; }

        const rect = btn.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const maxDist = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        if (!document.startViewTransition) {
            toggleTheme();
            return;
        }

        const transition = document.startViewTransition(() => {
            toggleTheme();
        });

        transition.ready.then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${maxDist * 1.1}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: 500,
                    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    pseudoElement: '::view-transition-new(root)',
                }
            );
        });
    }

    if (forMobile) {
        return (
            <button
                ref={btnRef}
                onClick={handleClick}
                className="p-2 rounded-full transition-all duration-150 active:scale-95"
                style={{ color: "var(--color-text-muted)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)"}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
        );
    }

    return (
        <button
            ref={btnRef}
            onClick={handleClick}
            className="hidden md:block fixed top-4 right-4 z-50 p-2 rounded-full transition-all duration-150 active:scale-95"
            style={{
                backgroundColor: "var(--color-bg-input)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-muted)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
            }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-text-primary)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "var(--color-text-muted)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.08)";
            }}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
    );
};

export default ThemeToggle;