import Header from "@/components/header";
import Footer from "@/components/footer";
import ViewLayout from "@/components/view";

import FolderColor from "@/components/control-panels/folder-color";
import FolderStyle from "@/components/control-panels/folder-style";
import FolderIconType from "@/components/control-panels/folder-icon-type";
import FolderIconInput from "@/components/control-panels/folder-icon-input";
import FolderIconOffset from "@/components/control-panels/folder-icon-offset";
import FolderIconShadow from "@/components/control-panels/folder-icon-shadow";

import FolderRender from "@/components/folder/folder-render";

export default function Home() {
  return (
    <>
      <div id="app">
        <Header />
        <div id="left-container">
          <FolderStyle />
          <FolderColor />
          <FolderIconType />
          <FolderIconInput />
          <FolderIconOffset />
          <FolderIconShadow />
        </div>
        <div id="right-container">
          <FolderRender folderSize={512} key={512} id="big-folder-512" />
          <FolderRender folderSize={256} key={256} id="small-folder-256" />
          <div className="hidden">
            <FolderRender folderSize={1024} key={1024} />
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
          <Footer />
        </div>
      </div>
      <ViewLayout />
    </>
  );
}
