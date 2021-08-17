import type { Configuration } from "twind"
import * as colors from "twind/colors"

const config: Configuration = {
  theme: {
    extend: {
      backgroundColor: {
        primary: "#1e1e1e",
        secondary: "#323232",
        "status-ok": "#00ff00",
      },
      colors: {
        primary: "#fdfdfd",
      },
      fill: {
        primary: "#fdfdfd",
      },
      boxShadow: {
        primary: "0 1px 10px rgba(0, 0, 0, 0.1)",
      },
    },
  },
}

export default config
