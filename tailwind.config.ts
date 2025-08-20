import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
    './types/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* Base Colors */
        background: {
          DEFAULT: 'var(--background)',
          alt: 'var(--background-alt)',
          elevated: 'var(--background-elevated)',
          overlay: 'var(--background-overlay)',
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          alt: 'var(--foreground-alt)',
          muted: 'var(--foreground-muted)',
          subtle: 'var(--foreground-subtle)',
        },

        /* Brand Colors */
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          foreground: 'var(--primary-foreground)',
          subtle: 'var(--primary-subtle)',
          muted: 'var(--primary-muted)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          hover: 'var(--secondary-hover)',
          foreground: 'var(--secondary-foreground)',
          subtle: 'var(--secondary-subtle)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          foreground: 'var(--accent-foreground)',
          subtle: 'var(--accent-subtle)',
          muted: 'var(--accent-muted)',
        },

        /* Semantic Colors */
        success: {
          DEFAULT: 'var(--success)',
          hover: 'var(--success-hover)',
          foreground: 'var(--success-foreground)',
          subtle: 'var(--success-subtle)',
          muted: 'var(--success-muted)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          hover: 'var(--warning-hover)',
          foreground: 'var(--warning-foreground)',
          subtle: 'var(--warning-subtle)',
          muted: 'var(--warning-muted)',
        },
        error: {
          DEFAULT: 'var(--error)',
          hover: 'var(--error-hover)',
          foreground: 'var(--error-foreground)',
          subtle: 'var(--error-subtle)',
          muted: 'var(--error-muted)',
        },

        /* Interactive Elements */
        border: {
          DEFAULT: 'var(--border)',
          hover: 'var(--border-hover)',
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
        },
        input: {
          DEFAULT: 'var(--input)',
          border: 'var(--input-border)',
          focus: 'var(--input-focus)',
        },
        ring: {
          DEFAULT: 'var(--ring)',
          offset: 'var(--ring-offset)',
        },

        /* Surface Layers */
        surface: {
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
          4: 'var(--surface-4)',
        },

        /* Overlay States */
        overlay: {
          hover: 'var(--hover-overlay)',
          active: 'var(--active-overlay)',
          focus: 'var(--focus-overlay)',
        },

        /* Legacy Support */
        muted: {
          DEFAULT: 'var(--surface-2)',
          foreground: 'var(--foreground-muted)',
        },
      },

      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },

      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },

      fontSize: {
        xs: 'var(--font-size-xs)',
        sm: 'var(--font-size-sm)',
        base: 'var(--font-size-base)',
        lg: 'var(--font-size-lg)',
        xl: 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
        '6xl': 'var(--font-size-6xl)',
      },

      spacing: {
        px: 'var(--space-px)',
        0: 'var(--space-0)',
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        10: 'var(--space-10)',
        12: 'var(--space-12)',
        16: 'var(--space-16)',
        20: 'var(--space-20)',
        24: 'var(--space-24)',
        32: 'var(--space-32)',
      },

      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
      },

      transitionDuration: {
        75: 'var(--duration-75)',
        100: 'var(--duration-100)',
        150: 'var(--duration-150)',
        200: 'var(--duration-200)',
        300: 'var(--duration-300)',
        500: 'var(--duration-500)',
        700: 'var(--duration-700)',
        1000: 'var(--duration-1000)',
      },

      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-down': 'fadeInDown 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-left': 'fadeInLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-right': 'fadeInRight 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-out': 'scaleOut 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-subtle': 'bounceSubtle 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.95)', opacity: '0' },
        },
        bounceSubtle: {
          '0%, 20%, 53%, 80%, 100%': {
            animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            transform: 'translate3d(0, 0, 0)',
          },
          '40%, 43%': {
            animationTimingFunction: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            transform: 'translate3d(0, -6px, 0)',
          },
          '70%': {
            animationTimingFunction: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
            transform: 'translate3d(0, -3px, 0)',
          },
          '90%': { transform: 'translate3d(0, -1px, 0)' },
        },
        pulseGlow: {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 0 0 var(--ring)',
          },
          '50%': {
            opacity: '0.8',
            boxShadow: '0 0 0 8px transparent',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
      },

      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
        'gradient-accent': 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
        shimmer: 'linear-gradient(90deg, transparent 0%, var(--foreground-subtle) 50%, transparent 100%)',
      },

      screens: {
        xs: '475px',
        '3xl': '1680px',
        '4xl': '2560px',
      },
    },
  },
  plugins: [],
}

export default config
