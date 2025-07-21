import React from 'react';
import { Global, css } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={css`
      :root {
        /* Dark Music Theme with Musical Vibes */
        --background: 240 10% 4%;
        --foreground: 0 0% 98%;

        --card: 240 8% 8%;
        --card-foreground: 0 0% 95%;

        --popover: 240 8% 8%;
        --popover-foreground: 0 0% 95%;

        --primary: 280 100% 70%;
        --primary-foreground: 0 0% 98%;
        --primary-glow: 280 100% 80%;
        --primary-dark: 280 100% 60%;

        --secondary: 260 15% 25%;
        --secondary-foreground: 0 0% 95%;

        --muted: 240 8% 15%;
        --muted-foreground: 240 5% 65%;

        --accent: 320 100% 65%;
        --accent-foreground: 0 0% 98%;
        --accent-glow: 320 100% 75%;

        --destructive: 0 84% 60%;
        --destructive-foreground: 0 0% 98%;

        --border: 240 8% 18%;
        --input: 240 8% 12%;
        --ring: 280 100% 70%;

        --radius: 12px;

        /* Musical Gradients */
        --gradient-primary: linear-gradient(135deg, hsl(280 100% 70%) 0%, hsl(320 100% 65%) 50%, hsl(280 100% 80%) 100%);
        --gradient-secondary: linear-gradient(135deg, hsl(260 60% 40%) 0%, hsl(280 70% 50%) 100%);
        --gradient-card: linear-gradient(145deg, hsl(240 8% 8%) 0%, hsl(240 12% 12%) 50%, hsl(240 8% 10%) 100%);
        --gradient-hero: linear-gradient(135deg, hsl(280 100% 70% / 0.1) 0%, hsl(320 100% 65% / 0.1) 50%, hsl(280 100% 80% / 0.05) 100%);
        --gradient-musical: radial-gradient(circle at 50% 50%, hsl(280 100% 70% / 0.3) 0%, transparent 70%);
        --gradient-beat: linear-gradient(90deg, hsl(280 100% 70% / 0.8) 0%, hsl(320 100% 65% / 0.8) 25%, hsl(280 100% 70% / 0.8) 50%, hsl(320 100% 65% / 0.8) 75%, hsl(280 100% 70% / 0.8) 100%);
        
        /* Musical Shadows */
        --shadow-glow: 0 20px 40px -12px hsl(280 100% 70% / 0.4);
        --shadow-card: 0 8px 30px -8px hsl(240 10% 2% / 0.6);
        --shadow-musical: 0 0 60px hsl(280 100% 70% / 0.2);
        --shadow-beat: 0 0 20px hsl(320 100% 65% / 0.3);
        
        /* Musical Animation variables */
        --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        --transition-bounce: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        --transition-beat: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        --transition-wave: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);

        --sidebar-background: 0 0% 98%;
        --sidebar-foreground: 240 5.3% 26.1%;
        --sidebar-primary: 240 5.9% 10%;
        --sidebar-primary-foreground: 0 0% 98%;
        --sidebar-accent: 240 4.8% 95.9%;
        --sidebar-accent-foreground: 240 5.9% 10%;
        --sidebar-border: 220 13% 91%;
        --sidebar-ring: 217.2 91.2% 59.8%;
      }

      .dark {
        --background: 222.2 84% 4.9%;
        --foreground: 210 40% 98%;

        --card: 222.2 84% 4.9%;
        --card-foreground: 210 40% 98%;

        --popover: 222.2 84% 4.9%;
        --popover-foreground: 210 40% 98%;

        --primary: 210 40% 98%;
        --primary-foreground: 222.2 47.4% 11.2%;

        --secondary: 217.2 32.6% 17.5%;
        --secondary-foreground: 210 40% 98%;

        --muted: 217.2 32.6% 17.5%;
        --muted-foreground: 215 20.2% 65.1%;

        --accent: 217.2 32.6% 17.5%;
        --accent-foreground: 210 40% 98%;

        --destructive: 0 62.8% 30.6%;
        --destructive-foreground: 210 40% 98%;

        --border: 217.2 32.6% 17.5%;
        --input: 217.2 32.6% 17.5%;
        --ring: 212.7 26.8% 83.9%;
        --sidebar-background: 240 5.9% 10%;
        --sidebar-foreground: 240 4.8% 95.9%;
        --sidebar-primary: 224.3 76.3% 48%;
        --sidebar-primary-foreground: 0 0% 100%;
        --sidebar-accent: 240 3.7% 15.9%;
        --sidebar-accent-foreground: 240 4.8% 95.9%;
        --sidebar-border: 240 3.7% 15.9%;
        --sidebar-ring: 217.2 91.2% 59.8%;
      }

      * {
        box-sizing: border-box; 
        border-color: hsl(var(--border));
      }

      body {
        margin: 0;
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; /* Example font stack */
        line-height: 1.5;
      }

      @keyframes musical-pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
      }

      @keyframes vinyl-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      @keyframes wave {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }

      @keyframes float {
        0%, 100% { transform: translateY(-50%) translateX(0); }
        50% { transform: translateY(-60%) translateX(5px); }
      }

      @keyframes glow-pulse {
        0% { box-shadow: var(--shadow-musical); }
        50% { box-shadow: var(--shadow-glow); }
        100% { box-shadow: var(--shadow-musical); }
      }
    `}
  />
);

export default GlobalStyles;