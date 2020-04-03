import React from "react"
import { Helmet } from "react-helmet"
import { Typography, Layout } from "antd"
const { Header, Content } = Layout
const { Title } = Typography

export default ({ header, children }) => (
  <Layout theme="dark" style={{ minHeight: "100vh", backgroundColor: "white" }}>
    <Helmet>
      <meta charSet="utf-8" />
      <title>SyncTime</title>
      <link rel="canonical" href="https://synctime.in" />
    </Helmet>
    <Header style={{ backgroundColor: "white" }}>
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
