import { ref, watch } from 'vue';

export default function useTheme() {

  const themeLink = document.getElementById("theme-link") as HTMLLinkElement | null;

  const themes = ["dark", "light"];
  const theme = ref('light');
  watch(theme, changeTheme);

  function changeTheme(newTheme: string) {    
    if (themeLink) {
      themeLink.href = `/themes/lara-${newTheme}-indigo/theme.css`;
    }
  }

  return {
    theme,
    themes,
    changeTheme
  }
}
