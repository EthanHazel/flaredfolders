"use client";

import Splash from "@/components/layout/splash";
import Header from "@/components/layout/header";
import Kofi from "@/components/layout/kofi";
import Footer from "@/components/layout/footer";
import ViewLayout from "@/components/layout/view";
import CheatCode from "@/components/cheat-code";

import FolderColor from "@/components/control-panels/folder-color";
import FolderStyle from "@/components/control-panels/folder-style";
import FolderIconType from "@/components/control-panels/folder-icon-type";
import FolderIconInput from "@/components/control-panels/folder-icon-input";
import FolderIconOffset from "@/components/control-panels/folder-icon-offset";
import FolderIconShadow from "@/components/control-panels/folder-icon-shadow";

import FolderRender from "@/components/folder/folder-render";

export default function Editor() {
  return (
    <>
      <div id="app">
        <CheatCode />
        <Splash />
        <div id="content">
          <div id="left-container">
            <Header />
            <div id="control-panels">
              <FolderStyle />
              <FolderColor />
              <FolderIconType />
              <FolderIconInput />
              <FolderIconOffset />
              <FolderIconShadow />
            </div>
            <Kofi />
          </div>
          <div id="right-container">
            <div id="folders">
              {[256, 128, 96, 72, 64, 48, 32, 24, 16].map((size) => (
                <FolderRender folderSize={size} key={size} />
              ))}
            </div>
            <Footer />
          </div>
        </div>
      </div>
      <ViewLayout />
    </>
  );
}
