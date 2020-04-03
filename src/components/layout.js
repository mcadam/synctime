import React from "react"
import { Typography, Layout } from "antd"
const { Header, Content } = Layout
const { Title } = Typography

export default ({ header, children }) => (
  <Layout style={{ minHeight: "100vh", backgroundColor: "white" }}>
    <Header style={{ backgroundColor: "white" }}>
      <Title level={4} style={{ lineHeight: "inherit" }}>
        {header}
      </Title>
    </Header>
    <Content
      style={{ padding: "0 50px", overflowX: "auto", textAlign: "center" }}
    >
      {children}
    </Content>
  </Layout>
)
