import '../src/assets/css/bootstrap.min.css';
import './App.css';
import React, {useEffect, useRef, useState} from 'react';
import Navbar from './components/navbar';
import logo from "./assets/img/forderapp.jpg";
function App() {
  const webview = useRef(null);
  const inputRef = useRef(null);
  const [webSrc, setWebSrc] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    const view = webview.current;
    const input = inputRef.current;
    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        if (view) {
          setWebSrc(input.value);
        }
      }
    });
  
  }, []);
  const openSite = (url) => {
    console.log('open site:', url);
    setWebSrc(url || 'about:blank');
    if (url) {
      setIsOpen(false);
    }else{
      setIsOpen(true);
    }
    
};
  return (
    <div className="App">
        <Navbar openSite={openSite} />
        
        <div className='container mx-auto text-center main-container' style={{display: isOpen ? "": "none"}}>
          <img src={logo}></img>
          <div class="input-group m-3 b-2 ">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
              </span>
            </div>
            <input type="text" class="form-control" placeholder="Search Anything!" ref={inputRef} aria-describedby="basic-addon1"/>
          </div>
        </div>
      <webview id="view" style={{ width: '100%', height: '90vh', display: isOpen ? "none": "" }} key={webSrc} ref={webview} src={webSrc} ></webview>

    </div>
  );
}

export default App;
