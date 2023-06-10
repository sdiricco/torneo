import { StatusBar, Style } from "@capacitor/status-bar";

export async function setTheme(isDark: boolean) {
  try {
    await StatusBar.setOverlaysWebView({overlay: true})
  } catch (e) {
    console.log("Error during setting status overlay")
  }
  setPrimeVueTheme(isDark);
  if (isDark) {
    setDarkTheme();
  }else{
    setLightTheme();

  }
}

function setPrimeVueTheme(isDark = false){
  const themeLink = document.getElementById("theme-link") as HTMLLinkElement | null;
  if(themeLink){
    themeLink.href = `/themes/lara-${isDark ? 'dark' : 'light'}-indigo/theme.css`;

  }
}

async function setDarkTheme(){
  try {
    await StatusBar.setStyle({ style: Style.Dark });
  } catch (e) {
    console.log("Error during setting status bar color");
  }
  document.body.classList.toggle("dark", true);

}

async function setLightTheme(){
  try {
    await StatusBar.setStyle({ style: Style.Dark });
  } catch (e) {
    console.log("Error during setting status bar color");
  }
  document.body.classList.toggle("dark", false);

}
