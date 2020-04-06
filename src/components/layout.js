import React, { useEffect } from "react"
import { Helmet } from "react-helmet"
import { Typography, Layout } from "antd"
import themeSwitcher from "theme-switcher"
import createPersistedState from "use-persisted-state"
import { getDefaultConfig } from "../utils/config"

const { Header, Content } = Layout
const { Title } = Typography

const useConfigState = createPersistedState("config")

const { switcher, getTheme } = themeSwitcher({
  themeMap: {
    default: "/antd.min.css",
    dark: "/antd.dark.min.css",
  },
})

export default ({ header, children }) => {
  const [config] = useConfigState(getDefaultConfig())

  useEffect(() => {
    const dom = document.getElementById("theme-style")
    const theme = config.darkMode ? "dark" : "default"
    if (theme !== getTheme() || !dom) {
      switcher({ theme: theme })
    }
  }, [config.darkMode]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "inherit" }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>SyncTime</title>
        <link rel="canonical" href="https://synctime.in" />
      </Helmet>
      <Header style={{ backgroundColor: "inherit" }}>
        <Title level={4} style={{ lineHeight: "inherit" }}>
          {header}
        </Title>
      </Header>
      <Content
        style={{
          padding: "0 50px",
          overflowX: "auto",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        {children}
      </Content>
    </Layout>
  )
}
