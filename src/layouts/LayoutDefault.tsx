import type { ReactNode } from "react";
import React, { useState, useEffect } from "react";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import Image from "next/image";
import { useChain } from "@cosmos-kit/react";
import { useRouter } from "next/router";

import Header from "@/components/Header";
import DaoSvg from "@/assets/image/dao.svg";
import MenuItem from "antd/es/menu/MenuItem";
import WrapperContent from "@/components/WrapperContent";
import OraiSvg from "@/assets/image/orai.svg";
import { network } from "@/config";

type Props = {
  children: ReactNode;
  title?: string;
};

const { Content, Sider, Header: LayoutHeader } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "ORAICHAIN DAO",
    "1",
    <div className="dao-icon">
      <Image src={OraiSvg} alt="dao icon" />
    </div>
  ),
  getItem("Home", "2", <HomeOutlined />),
  getItem("Create", "3", <PlusOutlined />),
];

const LayoutDocument = ({
  children,
  title = "This is the default title",
}: Props) => {
  const { connect, openView, status, getCosmWasmClient } = useChain(
    network.chainName
  );
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [currentKey, setCurrentKey] = useState("2");

  const handleSwitchPage: MenuProps["onClick"] = (e) => {
    switch (e.key) {
      case "1":
        router.push("/");
        setCurrentKey("2");
        break;
      case "2":
        router.push("/");
        setCurrentKey(e.key);
        break;
      case "3":
        router.push("/create-dao");
        setCurrentKey(e.key);
        break;
      default:
        break;
    }
  };

  return (
    <Layout id="layout">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          id="layout-menu"
          theme="light"
          defaultSelectedKeys={["2"]}
          selectedKeys={[currentKey]}
          mode="inline"
          items={items}
          onClick={handleSwitchPage}
        />
      </Sider>
      <Layout>
        <Header />
        <WrapperContent>
          {children}
        </WrapperContent>
      </Layout>
    </Layout>
  );
};
export default LayoutDocument;
