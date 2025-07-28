"use client";

import Splash from "@/components/splash";
import Header from "@/components/header";
import Kofi from "@/components/kofi";
import Footer from "@/components/footer";
import ViewLayout from "@/components/view";
import CheatCode from "@/components/cheat-code";

import FolderColor from "@/components/control-panels/folder-color";
import FolderStyle from "@/components/control-panels/folder-style";
import FolderIconType from "@/components/control-panels/folder-icon-type";
import FolderIconInput from "@/components/control-panels/folder-icon-input";
import FolderIconOffset from "@/components/control-panels/folder-icon-offset";
import FolderIconShadow from "@/components/control-panels/folder-icon-shadow";

import FolderRender from "@/components/folder/folder-render";

import fetchClient from "@/lib/fetch-client";
import HeaderDesktop from "@/components/header.desktop";

export default function Editor() {
  return (
    <>
      <div id="app" className={fetchClient() === "desktop" ? "desktop" : ""}>
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
            {fetchClient() === "desktop" && <HeaderDesktop />}
            <div id="folders">
              <FolderRender folderSize={512} key={512} id="big-folder-512" />
              <FolderRender folderSize={256} key={256} id="small-folder-256" />
              <div className="hidden">
                {[128, 96, 72].map((size) => (
                  <FolderRender folderSize={size} key={size} />
                ))}
              </div>
              <div id="small-folders">
                <FolderRender folderSize={64} key={64} id="small-folder-64" />
                <FolderRender folderSize={48} key={48} id="small-folder-48" />
                {[32, 24, 16].map((size) => (
                  <FolderRender folderSize={size} key={size} />
                ))}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
      <ViewLayout />
    </>
  );
}
