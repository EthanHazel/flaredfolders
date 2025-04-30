import Header from "@/components/header";
import Footer from "@/components/footer";

import FolderColor from "@/components/control-panels/folder-color";
import FolderStyle from "@/components/control-panels/folder-style";
import FolderIcon from "@/components/control-panels/folder-icon";
import FolderRender from "@/components/folder/folder-render";

export default function Home() {
  return (
    <div>
      <Header />
      <div id="left-container">
        <FolderStyle />
        <FolderColor />
        <FolderIcon />
      </div>
      <div id="right-container">
        <FolderRender folderSize={512} key={512} />
        <div className="hidden">
          <FolderRender folderSize={1024} key={1024} />
          {[256, 128, 96, 72].map((size) => (
            <FolderRender folderSize={size} key={size} />
          ))}
        </div>
        <div id="small-folders">
          {[64, 48, 32, 24, 16].map((size) => (
            <FolderRender folderSize={size} key={size} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}
