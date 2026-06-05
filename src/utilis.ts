import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
        main: '#29946e'
    },
    secondary: {
        main: '#8fabe0'
    },
    background: {
        default: '#070305',
        paper: '#070305'
    }
  },
  typography: {
    fontFamily: 'Georgia',
    fontSize: 12
  },
  spacing: 8,
  shape: {
    borderRadius: 20
  }
});

export const lightTheme = createTheme({
  palette: {
      mode: 'light',
      primary: {
          main: '#29946e'
      },
      secondary: {
          main: '#8fabe0'
      },
      background: {
          default: '#fcf8fa',
          paper: 'rgb(253, 250, 251)'
      }
  },
  typography: {
      fontFamily: 'Georgia',
      fontSize: 12
  },
  spacing: 8,
  shape: {
      borderRadius: 20
  }
});

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function(this: any, ...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  } as T
}