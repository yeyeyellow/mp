import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useState, useEffect, useRef, ChangeEvent } from 'react'; // Import useRef and ChangeEvent
import { Button } from "@/components/ui/button"

function App() {
  const fullText = "一个基于XXX的图像识别模型";
  const secondFullText = "developed by 唐胜圳";
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [displayedSecondText, setDisplayedSecondText] = useState('');
  const [secondIndex, setSecondIndex] = useState(0);
  const [isFirstAnimationComplete, setIsFirstAnimationComplete] = useState(false);
  const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]); // State for selected file names
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input

  // Effect for the first text
  useEffect(() => {
    if (index < fullText.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev: string) => prev + fullText[index]);
        setIndex((prev: number) => prev + 1);
      }, 150); // Adjust typing speed here (milliseconds)
      return () => clearTimeout(timeoutId);
    } else {
      setIsFirstAnimationComplete(true); // Mark first animation as complete
    }
  }, [index, fullText]);

  // Effect for the second text, starts after the first one completes
  useEffect(() => {
    if (isFirstAnimationComplete && secondIndex < secondFullText.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedSecondText((prev: string) => prev + secondFullText[secondIndex]);
        setSecondIndex((prev: number) => prev + 1);
      }, 80); // Adjust typing speed for the second text if needed
      return () => clearTimeout(timeoutId);
    }
  }, [isFirstAnimationComplete, secondIndex, secondFullText]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const names = Array.from(files).map(file => file.name);
      setSelectedFileNames(names);
      // Here you could add logic to actually upload/process the files
      console.log("Selected files:", files);
    }
  };

  const handleSelectImageClick = () => {
    fileInputRef.current?.click(); // Trigger click on hidden file input
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="text-center mb-4 text-5xl" style={{ minHeight: '1.2em' }}> {/* Added minHeight to prevent layout shift */}
          {displayedText}
        </div>

        <span style={{ minHeight: '1.2em', display: 'inline-block' }}> {/* Added minHeight and display style */}
          {displayedSecondText}
        </span>
        <Drawer>
          <DrawerTrigger className="bg-black text-white rounded-md px-8 py-4 my-5 transition-transform hover:scale-110 hover-shake">Try!</DrawerTrigger> {/* Added my-5, transition, hover scale and shake classes */}
          <DrawerContent className="flex flex-col justify-center items-center">
            <DrawerHeader>
              <DrawerTitle>请选择想要识别的图片</DrawerTitle>
              <DrawerDescription>选择完毕后点击上传等待处理结果.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*" // Accept only image files
                multiple // Allow multiple file selection
              />
              {/* Visible button to trigger file input */}
              <Button className="w-35" onClick={handleSelectImageClick}>选择图片</Button>
              <Button className="w-35">上传</Button> {/* Upload button logic not implemented yet */}
              <DrawerClose>
                <Button variant="outline">取消</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Right Section - Display selected file names */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8 border-l"> {/* Added padding and border */}
        <h2 className="text-2xl mb-4">已选择的文件:</h2>
        {selectedFileNames.length > 0 ? (
          <ul className="list-disc pl-5">
            {selectedFileNames.map((name, idx) => (
              <li key={idx}>{name}</li>
            ))}
          </ul>
        ) : (
          <p>尚未选择图片</p>
        )}
      </div>
    </div>
  );
}

export default App
