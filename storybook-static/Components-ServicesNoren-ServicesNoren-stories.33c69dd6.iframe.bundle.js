"use strict";(self.webpackChunkstudio=self.webpackChunkstudio||[]).push([[631],{"./src/Components/ServicesNoren/ServicesNoren.stories.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{AutoFlagCount:()=>AutoFlagCount,LabelList:()=>LabelList,Mobile:()=>Mobile,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var _index__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./src/Components/ServicesNoren/index.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/ServicesNoren",component:_index__WEBPACK_IMPORTED_MODULE_0__.Z,args:{color:"#4b0e0e",width:100,height:200,labels:["轟","隆","紅","龍","音","樂","製","作","工","作","室"]},argTypes:{color:{control:"color"},width:{control:{type:"number",min:40,max:180,step:1}},height:{control:{type:"number",min:80,max:320,step:1}},flagCount:{control:{type:"number",min:1,max:20,step:1}}},parameters:{layout:"fullscreen",viewport:{viewports:{mobileSm:{name:"Mobile 360",styles:{width:"360px",height:"800px"}},tablet:{name:"Tablet 768",styles:{width:"768px",height:"1024px"}},desktop:{name:"Desktop 1280",styles:{width:"1280px",height:"900px"}}}}},decorators:[Story=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{minHeight:"100vh",padding:"1.5rem 0.5rem 0.5rem",background:"#101015",display:"flex",justifyContent:"center",alignItems:"flex-start"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div",{style:{width:"100%",maxWidth:"100%"},children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Story,{})})})]},LabelList={},AutoFlagCount={args:{labels:void 0,flagCount:14,width:110,height:220}},Mobile={parameters:{viewport:{defaultViewport:"mobileSm"}}},__namedExportsOrder=["LabelList","AutoFlagCount","Mobile"];LabelList.parameters={...LabelList.parameters,docs:{...LabelList.parameters?.docs,source:{originalSource:"{}",...LabelList.parameters?.docs?.source}}},AutoFlagCount.parameters={...AutoFlagCount.parameters,docs:{...AutoFlagCount.parameters?.docs,source:{originalSource:"{\n  args: {\n    labels: undefined,\n    flagCount: 14,\n    width: 110,\n    height: 220\n  }\n}",...AutoFlagCount.parameters?.docs?.source}}},Mobile.parameters={...Mobile.parameters,docs:{...Mobile.parameters?.docs,source:{originalSource:'{\n  parameters: {\n    viewport: {\n      defaultViewport: "mobileSm"\n    }\n  }\n}',...Mobile.parameters?.docs?.source}}}},"./src/Components/ServicesNoren/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ServicesNoren});var react=__webpack_require__("./node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),DesignSystem=__webpack_require__("./src/DesignSystem/index.ts");const norenBreeze=styled_components_browser_esm.F4`
  0% {
    clip-path: polygon(0% 0%, 100% 0%, 99% 100%, 1% 100%);
    box-shadow: 0.18rem 0.2rem 0.4rem rgba(0, 0, 0, 0.08);
  }
  50% {
    clip-path: polygon(0% 0%, 100% 0%, 97% 100%, 5% 100%);
    box-shadow: 0.3rem 0.35rem 0.6rem rgba(0, 0, 0, 0.14);
  }
  100% {
    clip-path: polygon(0% 0%, 100% 0%, 99% 100%, 1% 100%);
    box-shadow: 0.18rem 0.2rem 0.4rem rgba(0, 0, 0, 0.08);
  }
`,norenGust=styled_components_browser_esm.F4`
  0% {
    clip-path: polygon(0% 0%, 100% 0%, 99% 100%, 1% 100%);
    box-shadow: 0.3rem 0.35rem 0.6rem rgba(0, 0, 0, 0.14);
  }
  45% {
    clip-path: polygon(0% 0%, 100% 0%, 90% 100%, 16% 100%);
    box-shadow: 1.15rem 1.1rem 1.65rem rgba(0, 0, 0, 0.34);
  }
  72% {
    clip-path: polygon(0% 0%, 100% 0%, 86% 100%, 6% 100%);
    box-shadow: 0.72rem 0.85rem 1.25rem rgba(0, 0, 0, 0.26);
  }
  100% {
    clip-path: polygon(0% 0%, 100% 0%, 99% 100%, 1% 100%);
    box-shadow: 0.18rem 0.2rem 0.4rem rgba(0, 0, 0, 0.08);
  }
`,norenShadeGust=styled_components_browser_esm.F4`
  0% {
    opacity: 0.8;
  }
  38% {
    opacity: 1;
  }
  48% {
    opacity: 1;
  }
  100% {
    opacity: 0.8;
  }
`,NorenScaleFrame=styled_components_browser_esm.ZP.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: ${_ref=>{let{$scaledHeightPx}=_ref;return`${$scaledHeightPx}px`}};
`,NorenScaleContent=styled_components_browser_esm.ZP.div`
  transform-origin: top center;
  transform: scale(${_ref2=>{let{$scale}=_ref2;return $scale}});
`,NorenContainer=styled_components_browser_esm.ZP.div`
  position: relative;
  width: max-content;
  --noren-cloth-width: ${_ref3=>{let{$clothWidth}=_ref3;return $clothWidth}};
  --noren-cloth-height: ${_ref4=>{let{$clothHeight}=_ref4;return $clothHeight}};
  --noren-strap-size: 20px;
  --noren-strap-gap: 0px;
  margin-bottom: ${DesignSystem.Wp.spacing.xl};
  padding-top: ${DesignSystem.Wp.spacing.lg};
`,NorenPole=styled_components_browser_esm.ZP.div`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(${DesignSystem.Wp.spacing.lg} + 1px);
  height: calc(var(--noren-strap-size) - 1px);
  background: linear-gradient(
    90deg,
    #4a2b1d 0%,
    #6e402b 30%,
    #805138 50%,
    #6e402b 70%,
    #4a2b1d 100%
  );
  z-index: 0;
`,NorenRow=styled_components_browser_esm.ZP.div`
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 2px;
`,NorenPanel=styled_components_browser_esm.ZP.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--noren-strap-gap);
`,NorenWraps=styled_components_browser_esm.ZP.div`
  width: var(--noren-cloth-width);
  display: flex;
  justify-content: space-between;
  align-items: center;
`,NorenWrap=styled_components_browser_esm.ZP.span`
  width: var(--noren-strap-size);
  height: var(--noren-strap-size);
  border-radius: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.06) 0.6px, transparent 0.9px),
    radial-gradient(rgba(0, 0, 0, 0.1) 0.6px, transparent 0.9px),
    ${_ref5=>{let{$wrapGradient}=_ref5;return $wrapGradient}};
  background-size: 3px 3px, 4px 4px, 100% 100%;
  background-position: 0 0, 1px 1px, 0 0;
`,NorenCloth=styled_components_browser_esm.ZP.div`
  width: var(--noren-cloth-width);
  height: var(--noren-cloth-height);
  position: relative;
  overflow: hidden;
  border-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${DesignSystem.Wp.spacing.xs};
  color: #ffffff;
  font-size: ${DesignSystem.Wp.fontSize["3xl"]};
  letter-spacing: 0.04em;
  background-image: radial-gradient(rgba(255, 255, 255, 0.05) 0.6px, transparent 0.9px),
    radial-gradient(rgba(0, 0, 0, 0.09) 0.6px, transparent 1px),
    linear-gradient(180deg, ${_ref6=>{let{$baseColor}=_ref6;return $baseColor}} 0%, ${_ref7=>{let{$baseColor}=_ref7;return $baseColor}} 100%);
  background-size: 3px 3px, 4px 4px, 100% 100%;
  background-position: 0 0, 1px 1px, 0 0;
  transition: clip-path 220ms ease, box-shadow 220ms ease;
  will-change: clip-path, box-shadow, background;
  ${_ref8=>{let{$isGusting,$phaseDelayMs}=_ref8;return $isGusting?styled_components_browser_esm.iv`
          animation: ${norenGust} 1200ms cubic-bezier(0.19, 0.86, 0.35, 1) 1,
            ${norenBreeze} 3600ms ease-in-out infinite;
          animation-delay: 0ms, ${$phaseDelayMs}ms;
        `:styled_components_browser_esm.iv`
          animation: ${norenBreeze} 3600ms ease-in-out infinite;
          animation-delay: ${$phaseDelayMs}ms;
        `}}
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 50%,
      ${_ref9=>{let{$shadeColor}=_ref9;return`${$shadeColor}80`}} 75%,
      ${_ref0=>{let{$shadeColor}=_ref0;return $shadeColor}} 100%
    );
    opacity: 0.8;
    ${_ref1=>{let{$isGusting}=_ref1;return $isGusting?styled_components_browser_esm.iv`
            animation: ${norenShadeGust} 1200ms cubic-bezier(0.2, 0.85, 0.2, 1) 1;
          `:styled_components_browser_esm.iv`
            animation: none;
          `}}
    z-index: 0;
  }
  > * {
    position: relative;
    z-index: 1;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const toPx=value=>"number"==typeof value?`${value}px`:value,darkenHex=(hex,amount)=>{const normalized=hex.replace("#",""),expanded=3===normalized.length?normalized.split("").map(char=>`${char}${char}`).join(""):normalized;if(6!==expanded.length)return hex;const parsed=Number.parseInt(expanded,16);if(Number.isNaN(parsed))return hex;const green=parsed>>8&255,blue=255&parsed,darken=channel=>Math.max(0,Math.round(channel*(1-amount)));return`#${[darken(parsed>>16&255),darken(green),darken(blue)].map(channel=>channel.toString(16).padStart(2,"0")).join("")}`},Noren=_ref=>{let{color,labels,flagCount,width=96,height=96}=_ref;const rowRef=react.useRef(null),probeRef=react.useRef(null),scaleFrameRef=react.useRef(null),scaleContentRef=react.useRef(null),[autoFlagCount,setAutoFlagCount]=react.useState(1),[scale,setScale]=react.useState(1),[scaledHeightPx,setScaledHeightPx]=react.useState(0),hasLabels=Boolean(labels&&labels.length),resolvedFlagCount=hasLabels?labels.length:flagCount?Math.max(1,Math.min(flagCount,autoFlagCount)):autoFlagCount,[isGusting,setIsGusting]=react.useState(()=>Array.from({length:resolvedFlagCount},()=>!1)),[phaseDelays,setPhaseDelays]=react.useState(()=>Array.from({length:resolvedFlagCount},()=>Math.round(-3600*Math.random()))),timeoutsRef=react.useRef(Array.from({length:resolvedFlagCount},()=>null));react.useEffect(()=>{if(hasLabels)return;const calculateAutoFlagCount=()=>{if(!rowRef.current||!probeRef.current)return;const rowWidth=rowRef.current.getBoundingClientRect().width,panelWidth=probeRef.current.getBoundingClientRect().width;if(!rowWidth||!panelWidth)return;const nextCount=Math.max(1,Math.floor((rowWidth+2)/(panelWidth+2)));setAutoFlagCount(nextCount)};calculateAutoFlagCount();const observer=new ResizeObserver(calculateAutoFlagCount);return rowRef.current&&observer.observe(rowRef.current),probeRef.current&&observer.observe(probeRef.current),()=>{observer.disconnect()}},[hasLabels,width]),react.useEffect(()=>{setIsGusting(Array.from({length:resolvedFlagCount},()=>!1)),setPhaseDelays(Array.from({length:resolvedFlagCount},()=>Math.round(-3600*Math.random()))),timeoutsRef.current.forEach(timeoutId=>{timeoutId&&window.clearTimeout(timeoutId)}),timeoutsRef.current=Array.from({length:resolvedFlagCount},()=>null)},[resolvedFlagCount]),react.useEffect(()=>()=>{timeoutsRef.current.forEach(timeoutId=>{timeoutId&&window.clearTimeout(timeoutId)})},[]),react.useLayoutEffect(()=>{const frame=scaleFrameRef.current,content=scaleContentRef.current;if(!frame||!content)return;const syncScale=()=>{const naturalWidth=content.offsetWidth,naturalHeight=content.offsetHeight;if(!naturalWidth||!naturalHeight)return;const availableWidth=frame.clientWidth,nextScale=Math.min(1,availableWidth/naturalWidth);setScale(previous=>Math.abs(previous-nextScale)<.001?previous:nextScale);const nextScaledHeight=Math.round(naturalHeight*nextScale);setScaledHeightPx(previous=>previous===nextScaledHeight?previous:nextScaledHeight)};syncScale();const observer=new ResizeObserver(syncScale);return observer.observe(frame),observer.observe(content),window.addEventListener("resize",syncScale),()=>{observer.disconnect(),window.removeEventListener("resize",syncScale)}},[resolvedFlagCount,width,height,labels]);const widthValue=toPx(width),heightValue=toPx(height),shadeColor=darkenHex(color,.58),wrapGradient=`linear-gradient(180deg, ${color} 0%, ${darkenHex(color,.22)} 100%)`;return(0,jsx_runtime.jsx)(NorenScaleFrame,{ref:scaleFrameRef,$scaledHeightPx:scaledHeightPx,children:(0,jsx_runtime.jsx)(NorenScaleContent,{ref:scaleContentRef,$scale:scale,children:(0,jsx_runtime.jsxs)(NorenContainer,{$clothWidth:widthValue,$clothHeight:heightValue,children:[(0,jsx_runtime.jsx)(NorenPole,{}),(0,jsx_runtime.jsxs)(NorenRow,{ref:rowRef,children:[(0,jsx_runtime.jsxs)(NorenPanel,{ref:probeRef,"aria-hidden":!0,style:{position:"absolute",visibility:"hidden",pointerEvents:"none"},children:[(0,jsx_runtime.jsxs)(NorenWraps,{children:[(0,jsx_runtime.jsx)(NorenWrap,{$wrapGradient:wrapGradient}),(0,jsx_runtime.jsx)(NorenWrap,{$wrapGradient:wrapGradient}),(0,jsx_runtime.jsx)(NorenWrap,{$wrapGradient:wrapGradient})]}),(0,jsx_runtime.jsx)(NorenCloth,{$isGusting:!1,$phaseDelayMs:0,$baseColor:color,$shadeColor:shadeColor})]}),Array.from({length:resolvedFlagCount},(_,index)=>{var _phaseDelays$index,_labels$index;return(0,jsx_runtime.jsxs)(NorenPanel,{onMouseEnter:()=>(index=>{setIsGusting(previous=>previous.map((active,currentIndex)=>currentIndex===index||active));const existingTimeout=timeoutsRef.current[index];existingTimeout&&window.clearTimeout(existingTimeout),timeoutsRef.current[index]=window.setTimeout(()=>{setIsGusting(previous=>previous.map((active,currentIndex)=>currentIndex!==index&&active)),timeoutsRef.current[index]=null},1200)})(index),children:[(0,jsx_runtime.jsxs)(NorenWraps,{children:[(0,jsx_runtime.jsx)(NorenWrap,{$wrapGradient:wrapGradient}),(0,jsx_runtime.jsx)(NorenWrap,{$wrapGradient:wrapGradient}),(0,jsx_runtime.jsx)(NorenWrap,{$wrapGradient:wrapGradient})]}),(0,jsx_runtime.jsx)(NorenCloth,{$isGusting:isGusting[index],$phaseDelayMs:null!==(_phaseDelays$index=phaseDelays[index])&&void 0!==_phaseDelays$index?_phaseDelays$index:0,$baseColor:color,$shadeColor:shadeColor,children:null!==(_labels$index=null==labels?void 0:labels[index])&&void 0!==_labels$index?_labels$index:""},`noren-cloth-${index}`)]},`noren-panel-${index}`)})]})]})})})},ServicesNoren=Noren;Noren.__docgenInfo={description:"",methods:[],displayName:"Noren",props:{color:{required:!0,tsType:{name:"string"},description:""},labels:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:""},flagCount:{required:!1,tsType:{name:"number"},description:""},width:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"",defaultValue:{value:"96",computed:!1}},height:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:"",defaultValue:{value:"96",computed:!1}}}}},"./src/DesignSystem/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Wp:()=>designTokens,UB:()=>getPaletteForTheme,K5:()=>layoutMedia,BC:()=>media});const designTokens={spacing:{none:"0",xxs:"0.125rem",xs:"0.25rem",sm:"0.5rem",md:"0.75rem",lg:"1rem",xl:"1.5rem",xxl:"2rem","3xl":"3rem","4xl":"4rem","5xl":"6rem","6xl":"8rem"},fontSize:{xs:"0.75rem",sm:"0.875rem",md:"1rem",lg:"1.125rem",xl:"1.25rem","2xl":"1.5rem","3xl":"2rem","4xl":"2.5rem","5xl":"3rem","6xl":"4rem","7xl":"5rem"},lineHeight:{tight:1.1,compact:1.25,normal:1.5,relaxed:1.7,loose:1.9},fontWeight:{regular:400,medium:500,semibold:600,bold:700},radius:{none:"0",sm:"0.25rem",md:"0.5rem",lg:"0.75rem",xl:"1rem",pill:"9999px",round:"50%"},borderWidth:{thin:"1px",regular:"2px",strong:"3px",heavy:"0.25rem"},size:{iconSm:"1rem",iconMd:"1.5rem",iconLg:"2rem",controlSm:"2rem",controlMd:"2.5rem",controlLg:"3rem",brandLogo:"6.25rem",contentMax:"87.5rem",proseMax:"46rem",pageMinHeight:"90vh",heroHeight:"35rem",cardHeight:"12rem",imageRailWidth:"24rem"},duration:{instant:"0ms",fast:"120ms",normal:"220ms",slow:"320ms",slower:"500ms",spin:"12s"},easing:{standard:"ease",in:"ease-in",out:"ease-out",inOut:"ease-in-out"},shadow:{none:"none",sm:"0 1px 2px rgba(0, 0, 0, 0.12)",md:"0 8px 20px rgba(0, 0, 0, 0.16)",lg:"0 14px 32px rgba(0, 0, 0, 0.2)"},zIndex:{base:0,raised:1,overlay:10,modal:20,popover:30,toast:40},breakpoint:{xs:"360px",sm:"600px",md:"768px",lg:"992px",xl:"1200px",xxl:"1440px"}},media={xs:`@media (min-width: ${designTokens.breakpoint.xs})`,sm:`@media (min-width: ${designTokens.breakpoint.sm})`,md:`@media (min-width: ${designTokens.breakpoint.md})`,lg:`@media (min-width: ${designTokens.breakpoint.lg})`,xl:`@media (min-width: ${designTokens.breakpoint.xl})`,xxl:`@media (min-width: ${designTokens.breakpoint.xxl})`},layoutMedia={headerDesktop:`@media (min-width: ${designTokens.breakpoint.lg})`};var types=__webpack_require__("./src/Utils/Theme/types.ts");const minimalPalettes={light:{primary:"#dc2626",background:"#f5f5f5",backgroundAccent:"#b6b4b4",frameInner:"#674E3D",footerIconHover:"#ffffff",subheadingBorder:"#863A2D",surface:"#ffffff",surfaceMuted:"#e5e5e5",accent:"#262626",accentLight:"#a3a3a3",text:"#0a0a0a",textMuted:"#525252",border:"#d4d4d4",white:"#ffffff",success:"#15803d",warning:"#b45309",danger:"#dc2626",info:"#0369a1",brandRed:"#EF4444",brandDark:"#581F1A",brandHighlight:"#CECE8D",brandHighlightLight:"#CCCCAE",brandLowlight:"#8A6A53",brandDarkest:"#141418",brandDarkHighlight:"#333333"},dark:{primary:"#ef4444",background:"#1e1e24",backgroundAccent:"#09090b",frameInner:"#8a6a53",footerIconHover:"#ffffff",subheadingBorder:"#863A2D",surface:"#18181b",surfaceMuted:"#27272a",accent:"#3f3f46",accentLight:"#71717a",text:"#fafafa",textMuted:"#d4d4d8",border:"#3f3f46",white:"#fafafa",success:"#22c55e",warning:"#f59e0b",danger:"#ef4444",info:"#38bdf8",brandRed:"#EF4444",brandDark:"#581F1A",brandHighlight:"#CECE8D",brandHighlightLight:"#CCCCAE",brandLowlight:"#8A6A53",brandDarkest:"#141418",brandDarkHighlight:"#333333"}},getPaletteForTheme=theme=>theme===types.Q.LIGHT?minimalPalettes.light:minimalPalettes.dark},"./src/Utils/Theme/types.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Q:()=>Theme});let Theme=function(Theme){return Theme.LIGHT="light",Theme.DARK="dark",Theme}({})}}]);
//# sourceMappingURL=Components-ServicesNoren-ServicesNoren-stories.33c69dd6.iframe.bundle.js.map