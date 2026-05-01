"use strict";(self.webpackChunkstudio=self.webpackChunkstudio||[]).push([[142],{"./src/Components/Header/Header.stories.jsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,Desktop:()=>Desktop,Mobile:()=>Mobile,Tablet:()=>Tablet,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Header_stories});var chunk_EVOBXE3Y=__webpack_require__("./node_modules/react-router/dist/development/chunk-EVOBXE3Y.mjs"),paper_texture=__webpack_require__("./node_modules/@paper-design/shaders-react/dist/shaders/paper-texture.js"),react=__webpack_require__("./node_modules/react/index.js"),react_dom=__webpack_require__("./node_modules/react-dom/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js");__webpack_require__.p;var DesignSystem=__webpack_require__("./src/DesignSystem/index.ts");const getColors=theme=>(0,DesignSystem.UB)(theme),mobileHeaderInset=DesignSystem.Wp.spacing.sm,maskGradient=styled_components_browser_esm.iv`
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, var(--header-m0)) 0%,
    rgba(0, 0, 0, var(--header-m1)) var(--header-fade-start),
    rgba(0, 0, 0, var(--header-m2)) 100%
  );
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, var(--header-m0)) 0%,
    rgba(0, 0, 0, var(--header-m1)) var(--header-fade-start),
    rgba(0, 0, 0, var(--header-m2)) 100%
  );
`,StyledHeader=styled_components_browser_esm.ZP.div`
  @property --header-fade-start {
    syntax: "<percentage>";
    inherits: false;
    initial-value: 100%;
  }
  @property --header-m0 {
    syntax: "<number>";
    inherits: false;
    initial-value: 1;
  }
  @property --header-m1 {
    syntax: "<number>";
    inherits: false;
    initial-value: 1;
  }
  @property --header-m2 {
    syntax: "<number>";
    inherits: false;
    initial-value: 0;
  }
  --header-fade-start: 100%;
  --header-m0: ${_ref=>{let{$isPastThreshold,$forceOpaque}=_ref;return $isPastThreshold&&!$forceOpaque?.5:1}};
  --header-m1: ${_ref2=>{let{$isPastThreshold,$forceOpaque}=_ref2;return $isPastThreshold&&!$forceOpaque?.25:1}};
  --header-m2: ${_ref3=>{let{$isPastThreshold,$forceOpaque}=_ref3;return $isPastThreshold&&!$forceOpaque?.25:0}};
  --header-fade-duration: ${_ref4=>{let{$isPastThreshold,$forceOpaque}=_ref4;return!$isPastThreshold||$forceOpaque?"0.14s":"0.35s"}};
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${DesignSystem.Wp.size.contentMax};
  box-sizing: border-box;
  padding-top: env(safe-area-inset-top, 0px);
  overflow: hidden;
  display: flex;
  align-items: center;
  z-index: 2003;
  ${maskGradient}
  transition: --header-fade-start var(--header-fade-duration) ease-in-out,
    --header-m0 var(--header-fade-duration) ease-in-out,
    --header-m1 var(--header-fade-duration) ease-in-out,
    --header-m2 var(--header-fade-duration) ease-in-out;
  :hover {
    --header-fade-start: ${_ref5=>{let{$isPastThreshold,$forceOpaque}=_ref5;return $isPastThreshold&&!$forceOpaque?"90%":"100%"}};
    --header-m0: 1;
    --header-m1: 1;
    --header-m2: 0;
  }
`,HeaderContent=styled_components_browser_esm.ZP.div`
  position: relative;
  z-index: 1;
  --header-side-inset: ${_ref6=>{let{$sideInsetPx}=_ref6;return`${$sideInsetPx}px`}};
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  ${DesignSystem.K5.headerDesktop} {
    --header-side-inset: 0px;
  }
`,HeaderSide=styled_components_browser_esm.ZP.div`
  flex: 0 0 auto;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: ${props=>"left"===props.align?"flex-start":"flex-end"};
  position: relative;
  z-index: ${DesignSystem.Wp.zIndex.overlay};
  min-width: 0;
  padding-top: ${mobileHeaderInset};
  padding-bottom: ${mobileHeaderInset};
  ${props=>"left"===props.align?styled_components_browser_esm.iv`
          padding-left: max(
            env(safe-area-inset-left, 0px),
            ${mobileHeaderInset}
          );
          padding-right: 0;
        `:styled_components_browser_esm.iv`
          padding-left: 0;
          padding-right: max(
            env(safe-area-inset-right, 0px),
            ${mobileHeaderInset}
          );
        `}
  ${DesignSystem.K5.headerDesktop} {
    padding: ${DesignSystem.Wp.spacing.lg} ${DesignSystem.Wp.spacing.xl};
  }
`,TitleLogoContainer=(styled_components_browser_esm.ZP.img`
  width: ${DesignSystem.Wp.size.brandLogo};
  height: ${DesignSystem.Wp.size.brandLogo};
`,styled_components_browser_esm.ZP.h1`
  font-family: "MyFont";
  font-size: ${DesignSystem.Wp.fontSize["6xl"]};
`,styled_components_browser_esm.ZP.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: max(calc(100% - (var(--header-side-inset) * 2)), 0px);
  padding-top: ${DesignSystem.Wp.spacing.none};
  padding-bottom: ${DesignSystem.Wp.spacing.none};
  padding-left: ${DesignSystem.Wp.spacing.xs};
  padding-right: ${DesignSystem.Wp.spacing.xs};
  z-index: ${DesignSystem.Wp.zIndex.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  > * {
    max-width: 100%;
  }
  ${DesignSystem.K5.headerDesktop} {
    position: relative;
    top: auto;
    bottom: auto;
    left: auto;
    transform: none;
    width: auto;
    padding: ${DesignSystem.Wp.spacing.lg};
    pointer-events: auto;
  }
`),LanguageThemeContainer=styled_components_browser_esm.ZP.div`
  height: min-content;
  width: min-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${DesignSystem.Wp.spacing.sm};
`,MobileOnly=styled_components_browser_esm.ZP.div`
  display: flex;
  align-items: center;
  justify-content: inherit;
  ${DesignSystem.K5.headerDesktop} {
    display: none;
  }
`,DesktopOnly=styled_components_browser_esm.ZP.div`
  display: none;
  ${DesignSystem.K5.headerDesktop} {
    display: flex;
    align-items: center;
  }
`,HeaderIconButton=styled_components_browser_esm.ZP.button`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: ${DesignSystem.Wp.size.controlMd};
  height: ${DesignSystem.Wp.size.controlMd};
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;
  color: ${props=>getColors(props.theme).text};
  cursor: pointer;
  border-radius: ${DesignSystem.Wp.radius.md};
  flex-shrink: 0;

  &:focus-visible {
    outline: ${DesignSystem.Wp.borderWidth.regular} solid
      ${props=>getColors(props.theme).accent};
    outline-offset: 2px;
  }
`,BurgerBar=styled_components_browser_esm.ZP.span`
  display: block;
  width: 1.25rem;
  height: 2px;
  background: currentColor;
  border-radius: ${DesignSystem.Wp.radius.pill};
`,MobileNavBackdrop=styled_components_browser_esm.ZP.button`
  position: fixed;
  inset: 0;
  top: var(--header-portal-top, calc(env(safe-area-inset-top, 0px) + 4.75rem));
  z-index: 2500;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.45);
`,MobileNavPanel=styled_components_browser_esm.ZP.nav`
  position: fixed;
  top: var(--header-portal-top, calc(env(safe-area-inset-top, 0px) + 4.75rem));
  left: 0;
  bottom: 0;
  z-index: 2501;
  width: min(17.5rem, 86vw);
  box-sizing: border-box;
  background: ${props=>getColors(props.theme).background};
  border-right: ${DesignSystem.Wp.borderWidth.strong} solid
    ${props=>getColors(props.theme).text};
  box-shadow: ${DesignSystem.Wp.shadow.md};
  padding: ${DesignSystem.Wp.spacing.xl} ${DesignSystem.Wp.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${DesignSystem.Wp.spacing.xs};
`,MobileNavLink=styled_components_browser_esm.ZP.button`
  text-align: left;
  font-size: ${DesignSystem.Wp.fontSize.lg};
  line-height: ${DesignSystem.Wp.lineHeight.compact};
  padding: ${DesignSystem.Wp.spacing.md} ${DesignSystem.Wp.spacing.sm};
  border: 0;
  background: transparent;
  color: ${props=>getColors(props.theme).text};
  cursor: pointer;
  opacity: ${props=>props.$active?1:.72};
  border-radius: ${DesignSystem.Wp.radius.sm};

  &:hover {
    opacity: 1;
  }
`,OptionsBackdrop=styled_components_browser_esm.ZP.button`
  position: fixed;
  inset: 0;
  z-index: 2498;
  border: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.35);
`,OptionsMenuPanel=styled_components_browser_esm.ZP.div`
  position: fixed;
  z-index: 2499;
  top: calc(
    var(--header-portal-top, calc(env(safe-area-inset-top, 0px) + 4.75rem)) +
      ${DesignSystem.Wp.spacing.xs}
  );
  right: max(env(safe-area-inset-right, 0px), ${mobileHeaderInset});
  min-width: 12rem;
  max-width: min(18rem, 92vw);
  box-sizing: border-box;
  padding: ${DesignSystem.Wp.spacing.lg};
  background: ${props=>getColors(props.theme).background};
  border: ${DesignSystem.Wp.borderWidth.strong} solid
    ${props=>getColors(props.theme).text};
  box-shadow: ${DesignSystem.Wp.shadow.lg};
  display: flex;
  flex-direction: column;
  gap: ${DesignSystem.Wp.spacing.lg};
  align-items: stretch;
`,OptionsMenuLabel=styled_components_browser_esm.ZP.span`
  font-size: ${DesignSystem.Wp.fontSize.xs};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${props=>getColors(props.theme).textMuted};
`,CogIconSvg=styled_components_browser_esm.ZP.svg`
  width: ${DesignSystem.Wp.size.iconMd};
  height: ${DesignSystem.Wp.size.iconMd};
  flex-shrink: 0;
`,Container=styled_components_browser_esm.ZP.div`
  position: relative;
  height: min-content;
  width: min-content;
  padding: ${DesignSystem.Wp.spacing.sm} ${DesignSystem.Wp.spacing.none}
    ${DesignSystem.Wp.spacing.md} ${DesignSystem.Wp.spacing.none};
  display: flex;
  flex-wrap: nowrap;
  gap: ${DesignSystem.Wp.spacing.lg};
`,Highlight=styled_components_browser_esm.ZP.div`
  position: absolute;
  bottom: ${DesignSystem.Wp.spacing.none};
  left: ${props=>props.left}px;
  width: ${props=>props.width}px;
  height: ${DesignSystem.Wp.borderWidth.strong};
  border-radius: ${DesignSystem.Wp.radius.pill};
  border-bottom: ${DesignSystem.Wp.borderWidth.strong} solid
    ${props=>getColors(props.theme).text};
  transition: left ${DesignSystem.Wp.duration.normal} ${DesignSystem.Wp.easing.out},
    width ${DesignSystem.Wp.duration.normal} ${DesignSystem.Wp.easing.out};
  pointer-events: none;
`,Option=styled_components_browser_esm.ZP.button`
  position: relative;
  z-index: ${DesignSystem.Wp.zIndex.raised};
  background: transparent;
  color: ${props=>getColors(props.theme).text};
  white-space: nowrap;
  box-sizing: border-box;
  border: 0;
  padding: ${DesignSystem.Wp.spacing.xs} ${DesignSystem.Wp.spacing.none};
  opacity: ${props=>props.selected?1:.7};
  font-size: ${DesignSystem.Wp.fontSize.lg};
  line-height: ${DesignSystem.Wp.lineHeight.compact};
  transition: opacity ${DesignSystem.Wp.duration.fast} ${DesignSystem.Wp.easing.in};

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");const Selector=_ref=>{let{theme,options,selectedOption,onSelect}=_ref;const optionRefs=(0,react.useRef)({}),[highlightPosition,setHighlightPosition]=(0,react.useState)({left:0,width:0}),updateHighlight=(0,react.useCallback)(()=>{const selectedElement=optionRefs.current[selectedOption];selectedElement&&setHighlightPosition({left:selectedElement.offsetLeft,width:selectedElement.offsetWidth})},[selectedOption]);return(0,react.useEffect)(()=>{updateHighlight()},[selectedOption,options,updateHighlight]),(0,react.useEffect)(()=>(window.addEventListener("resize",updateHighlight),()=>window.removeEventListener("resize",updateHighlight)),[updateHighlight]),(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsxs)(Container,{theme,children:[(0,jsx_runtime.jsx)(Highlight,{theme,left:highlightPosition.left,width:highlightPosition.width}),options.map(option=>(0,jsx_runtime.jsx)(Option,{ref:ref=>{optionRefs.current[option]=ref},theme,selected:selectedOption===option,onClick:()=>(option=>{onSelect(option)})(option),children:option},option))]})})},Components_Selector=Selector;Selector.__docgenInfo={description:"",methods:[],displayName:"Selector",props:{theme:{required:!0,tsType:{name:"Theme"},description:""},borderless:{required:!1,tsType:{name:"boolean"},description:""},options:{required:!0,tsType:{name:"tuple",raw:"[T, ...T[]]",elements:[{name:"string"},{name:"unknown"}]},description:""},selectedOption:{required:!0,tsType:{name:"string"},description:""},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(option: string) => void",signature:{arguments:[{type:{name:"string"},name:"option"}],return:{name:"void"}}},description:""}}};var embla_carousel_react_esm=__webpack_require__("./node_modules/embla-carousel-react/esm/embla-carousel-react.esm.js"),embla_carousel_wheel_gestures_esm=__webpack_require__("./node_modules/embla-carousel-wheel-gestures/dist/embla-carousel-wheel-gestures.esm.js"),warp=__webpack_require__("./node_modules/@paper-design/shaders-react/dist/shaders/warp.js"),types=__webpack_require__("./src/Utils/Theme/types.ts");const ThemeContext=(0,react.createContext)(void 0),useTheme=()=>{const context=(0,react.useContext)(ThemeContext);if(!context)throw new Error("useTheme must be used within a ThemeProvider");return context},ThemeProvider=_ref=>{let{children}=_ref;const[theme,setTheme]=(0,react.useState)(types.Q.DARK);(0,react.useEffect)(()=>{const colors=getColors(theme);document.documentElement.style.setProperty("--theme-transition-duration",DesignSystem.Wp.duration.normal),document.documentElement.style.setProperty("--theme-transition-easing",DesignSystem.Wp.easing.standard),document.documentElement.style.setProperty("--frame-background",colors.background),document.documentElement.style.setProperty("--app-background",colors.background),document.documentElement.style.setProperty("--frame-border",colors.accent),document.documentElement.style.setProperty("--frame-inner-color",colors.frameInner),document.documentElement.style.setProperty("--footer-icon-hover-color",colors.footerIconHover)},[theme]);return(0,jsx_runtime.jsx)(ThemeContext.Provider,{value:{theme,toggleTheme:()=>{setTheme(prevTheme=>prevTheme===types.Q.LIGHT?types.Q.DARK:types.Q.LIGHT)}},children})};var _path;function _extends(){return _extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},_extends.apply(null,arguments)}function SvgInstagramWhiteIcon(_ref,svgRef){let{title,titleId,...props}=_ref;return react.createElement("svg",_extends({xmlns:"http://www.w3.org/2000/svg",shapeRendering:"geometricPrecision",textRendering:"geometricPrecision",imageRendering:"optimizeQuality",fillRule:"evenodd",clipRule:"evenodd",viewBox:"0 0 512 512",ref:svgRef,"aria-labelledby":titleId},props),title?react.createElement("title",{id:titleId},title):null,_path||(_path=react.createElement("path",{fill:"#fff",fillRule:"nonzero",d:"M170.663 256.157c-.083-47.121 38.055-85.4 85.167-85.483 47.121-.092 85.407 38.03 85.499 85.16.091 47.129-38.047 85.4-85.176 85.492-47.112.09-85.399-38.039-85.49-85.169zm-46.108.091c.141 72.602 59.106 131.327 131.69 131.186 72.592-.141 131.35-59.09 131.209-131.692-.141-72.577-59.114-131.335-131.715-131.194-72.585.141-131.325 59.115-131.184 131.7zm237.104-137.091c.033 16.953 13.817 30.681 30.772 30.648 16.961-.033 30.689-13.811 30.664-30.764-.033-16.954-13.818-30.69-30.78-30.657-16.962.033-30.689 13.818-30.656 30.773zm-208.696 345.4c-24.958-1.087-38.511-5.234-47.543-8.709-11.961-4.629-20.496-10.178-29.479-19.094-8.966-8.95-14.532-17.46-19.202-29.397-3.508-9.032-7.73-22.569-8.9-47.527-1.269-26.982-1.559-35.077-1.683-103.432-.133-68.339.116-76.434 1.294-103.441 1.069-24.942 5.242-38.512 8.709-47.536 4.628-11.977 10.161-20.496 19.094-29.479 8.949-8.982 17.459-14.532 29.403-19.202 9.025-3.525 22.561-7.714 47.511-8.9 26.998-1.277 35.085-1.551 103.423-1.684 68.353-.132 76.448.108 103.456 1.295 24.94 1.086 38.51 5.217 47.527 8.709 11.968 4.628 20.503 10.144 29.478 19.094 8.974 8.95 14.54 17.443 19.21 29.412 3.524 9 7.714 22.553 8.892 47.494 1.285 26.999 1.576 35.095 1.7 103.433.132 68.355-.117 76.451-1.302 103.441-1.087 24.958-5.226 38.52-8.709 47.561-4.629 11.952-10.161 20.487-19.103 29.471-8.941 8.949-17.451 14.531-29.403 19.201-9.009 3.517-22.561 7.714-47.494 8.9-26.998 1.269-35.086 1.559-103.448 1.684-68.338.132-76.424-.125-103.431-1.294zM149.977 1.773c-27.239 1.285-45.843 5.648-62.101 12.018-16.829 6.561-31.095 15.354-45.286 29.604C28.381 57.653 19.655 71.944 13.144 88.79c-6.303 16.299-10.575 34.912-11.778 62.168C.172 178.264-.102 186.973.031 256.489c.133 69.508.439 78.234 1.741 105.547 1.302 27.231 5.649 45.828 12.019 62.093 6.569 16.83 15.353 31.088 29.611 45.288 14.25 14.201 28.55 22.918 45.404 29.438 16.282 6.295 34.902 10.583 62.15 11.778 27.305 1.203 36.022 1.468 105.521 1.335 69.532-.132 78.25-.439 105.555-1.733 27.239-1.303 45.826-5.665 62.1-12.019 16.829-6.586 31.095-15.353 45.288-29.611 14.191-14.251 22.917-28.55 29.428-45.405 6.304-16.282 10.592-34.903 11.777-62.134 1.195-27.322 1.478-36.048 1.344-105.556-.133-69.516-.447-78.225-1.741-105.523-1.294-27.255-5.657-45.844-12.019-62.118-6.577-16.829-15.352-31.079-29.602-45.287-14.25-14.192-28.55-22.935-45.404-29.429-16.29-6.305-34.903-10.601-62.15-11.779C333.747.164 325.03-.102 255.506.031c-69.507.133-78.224.431-105.529 1.742z"})))}ThemeProvider.__docgenInfo={description:"",methods:[],displayName:"ThemeProvider",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const ForwardRef=react.forwardRef(SvgInstagramWhiteIcon);__webpack_require__.p;var youtube_app_white_icon_path;function youtube_app_white_icon_extends(){return youtube_app_white_icon_extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},youtube_app_white_icon_extends.apply(null,arguments)}function SvgYoutubeAppWhiteIcon(_ref,svgRef){let{title,titleId,...props}=_ref;return react.createElement("svg",youtube_app_white_icon_extends({xmlns:"http://www.w3.org/2000/svg",shapeRendering:"geometricPrecision",textRendering:"geometricPrecision",imageRendering:"optimizeQuality",fillRule:"evenodd",clipRule:"evenodd",viewBox:"0 0 512 360.726",ref:svgRef,"aria-labelledby":titleId},props),title?react.createElement("title",{id:titleId},title):null,youtube_app_white_icon_path||(youtube_app_white_icon_path=react.createElement("path",{fill:"#fff",d:"M456.035 10.769c22.031 5.926 39.377 23.386 45.265 45.56C512 96.516 512 180.363 512 180.363s0 83.846-10.7 124.037c-5.888 22.17-23.234 39.631-45.265 45.559-39.928 10.767-200.034 10.767-200.034 10.767s-160.107 0-200.035-10.767C33.937 344.031 16.587 326.57 10.7 304.4 0 264.209 0 180.363 0 180.363S0 96.516 10.7 56.329c5.887-22.174 23.237-39.634 45.266-45.56C95.894 0 256.001 0 256.001 0s160.106 0 200.034 10.769zm-252.398 245.72l133.818-76.122-133.818-76.131v152.253z"})))}const youtube_app_white_icon_ForwardRef=react.forwardRef(SvgYoutubeAppWhiteIcon);__webpack_require__.p;var spotify_white_icon_path;function spotify_white_icon_extends(){return spotify_white_icon_extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},spotify_white_icon_extends.apply(null,arguments)}function SvgSpotifyWhiteIcon(_ref,svgRef){let{title,titleId,...props}=_ref;return react.createElement("svg",spotify_white_icon_extends({xmlns:"http://www.w3.org/2000/svg",shapeRendering:"geometricPrecision",textRendering:"geometricPrecision",imageRendering:"optimizeQuality",fillRule:"evenodd",clipRule:"evenodd",viewBox:"0 0 512 511.991",ref:svgRef,"aria-labelledby":titleId},props),title?react.createElement("title",{id:titleId},title):null,spotify_white_icon_path||(spotify_white_icon_path=react.createElement("path",{fill:"#fff",fillRule:"nonzero",d:"M255.998.003C114.616.003 0 114.616 0 255.997c0 141.385 114.616 255.994 255.998 255.994C397.395 511.991 512 397.386 512 255.997 512 114.624 397.395.015 255.994.015l.004-.015v.003zm117.4 369.22c-4.585 7.519-14.427 9.908-21.949 5.288-60.104-36.714-135.771-45.027-224.882-24.668-8.587 1.954-17.146-3.425-19.104-12.015-1.967-8.591 3.394-17.15 12.003-19.104 97.518-22.28 181.164-12.688 248.645 28.55 7.522 4.616 9.907 14.427 5.288 21.95l-.001-.001zm31.335-69.703c-5.779 9.389-18.067 12.353-27.452 6.578-68.813-42.298-173.703-54.548-255.096-29.837-10.556 3.187-21.704-2.761-24.906-13.298-3.18-10.556 2.772-21.68 13.309-24.891 92.971-28.208 208.551-14.546 287.574 34.015 9.385 5.779 12.35 18.067 6.575 27.441v-.004l-.004-.004zm2.692-72.584c-82.511-49.006-218.635-53.51-297.409-29.603-12.649 3.837-26.027-3.302-29.86-15.955-3.832-12.656 3.303-26.023 15.96-29.867 90.428-27.452 240.753-22.149 335.747 34.245 11.401 6.754 15.133 21.446 8.375 32.809-6.728 11.378-21.462 15.13-32.802 8.371h-.011z"})))}const spotify_white_icon_ForwardRef=react.forwardRef(SvgSpotifyWhiteIcon);__webpack_require__.p;var facebook_app_round_white_icon_path;function facebook_app_round_white_icon_extends(){return facebook_app_round_white_icon_extends=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)({}).hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},facebook_app_round_white_icon_extends.apply(null,arguments)}function SvgFacebookAppRoundWhiteIcon(_ref,svgRef){let{title,titleId,...props}=_ref;return react.createElement("svg",facebook_app_round_white_icon_extends({xmlns:"http://www.w3.org/2000/svg",shapeRendering:"geometricPrecision",textRendering:"geometricPrecision",imageRendering:"optimizeQuality",fillRule:"evenodd",clipRule:"evenodd",viewBox:"0 0 512 510.125",ref:svgRef,"aria-labelledby":titleId},props),title?react.createElement("title",{id:titleId},title):null,facebook_app_round_white_icon_path||(facebook_app_round_white_icon_path=react.createElement("path",{fill:"#fff",fillRule:"nonzero",d:"M512 256C512 114.615 397.385 0 256 0S0 114.615 0 256c0 120.059 82.652 220.797 194.157 248.461V334.229h-52.79V256h52.79v-33.709c0-87.134 39.432-127.521 124.977-127.521 16.218 0 44.202 3.18 55.651 6.36v70.916c-6.042-.635-16.537-.954-29.575-.954-41.977 0-58.196 15.901-58.196 57.241V256h83.619l-14.365 78.229h-69.254v175.896C413.771 494.815 512 386.885 512 256z"})))}const facebook_app_round_white_icon_ForwardRef=react.forwardRef(SvgFacebookAppRoundWhiteIcon),StyledFooter=(__webpack_require__.p,styled_components_browser_esm.ZP.div`
  border-top: ${DesignSystem.Wp.borderWidth.thin} solid var(--frame-inner-color);
  padding: ${DesignSystem.Wp.spacing.lg} ${DesignSystem.Wp.spacing.xl};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: ${DesignSystem.Wp.spacing.sm};
  color: var(--frame-inner-color);
  font-size: ${DesignSystem.Wp.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`),FooterLeft=styled_components_browser_esm.ZP.div`
  display: flex;
  align-items: center;
  gap: ${DesignSystem.Wp.spacing.md};
`,FooterCenter=styled_components_browser_esm.ZP.div`
  text-align: center;
  white-space: nowrap;
`,FooterRight=styled_components_browser_esm.ZP.div`
  text-align: right;
  white-space: nowrap;
`,FooterIcon=styled_components_browser_esm.ZP.a`
  color: var(--frame-inner-color);
  width: 2.5rem;
  height: 2.5rem;
  padding: ${DesignSystem.Wp.spacing.sm};
  background: transparent;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: color var(--theme-transition-duration) var(--theme-transition-easing);
  &:hover {
    color: var(--footer-icon-hover-color, #ffffff);
  }
  svg {
    width: 100%;
    height: 100%;
  }
  svg path {
    fill: currentColor;
  }
`,currentYear=(new Date).getFullYear(),Footer=()=>{const{theme}=useTheme();return(0,jsx_runtime.jsxs)(StyledFooter,{theme,children:[(0,jsx_runtime.jsxs)(FooterLeft,{children:[(0,jsx_runtime.jsx)(FooterIcon,{"aria-label":"Instagram",href:"https://www.instagram.com/reddragonrecordstaiwan",target:"_blank",rel:"noreferrer",children:(0,jsx_runtime.jsx)(ForwardRef,{})}),(0,jsx_runtime.jsx)(FooterIcon,{"aria-label":"YouTube",href:"https://www.youtube.com/watch?v=WpkJLRaLlHA&list=PLC5DK5U_EYSaT4YBBiikV7fklgAvtt2xJ",target:"_blank",rel:"noreferrer",children:(0,jsx_runtime.jsx)(youtube_app_white_icon_ForwardRef,{})}),(0,jsx_runtime.jsx)(FooterIcon,{"aria-label":"Spotify",href:"https://open.spotify.com/album/69jva0Nui1EfyRH1KwGl8J?si=MDUGbR80Q9GZsp3Sz7CSIg",target:"_blank",rel:"noreferrer",children:(0,jsx_runtime.jsx)(spotify_white_icon_ForwardRef,{})}),(0,jsx_runtime.jsx)(FooterIcon,{"aria-label":"Facebook",href:"https://www.facebook.com/profile.php?id=100092575400299",target:"_blank",rel:"noreferrer",children:(0,jsx_runtime.jsx)(facebook_app_round_white_icon_ForwardRef,{})})]}),(0,jsx_runtime.jsx)(FooterCenter,{children:`©${currentYear} Red Dragon Records. All Rights Reserved.`}),(0,jsx_runtime.jsx)(FooterRight,{children:"Tainan, Taiwan"})]})},Components_Footer=Footer;Footer.__docgenInfo={description:"",methods:[],displayName:"Footer"};const PosterFrame=_ref=>{let{children}=_ref;const{theme}=useTheme(),colors=getColors(theme);return(0,jsx_runtime.jsxs)("div",{className:"poster-frame",children:[(0,jsx_runtime.jsx)("div",{className:"poster-frame__texture","aria-hidden":"true",children:(0,jsx_runtime.jsx)(paper_texture.Hx,{colorBack:colors.background,colorFront:colors.backgroundAccent,contrast:.12,roughness:1,fiber:.05,fiberSize:.01,crumples:0,crumpleSize:.01,folds:0,foldCount:1,drops:0,fade:0,seed:0,scale:.5,fit:"cover"})}),(0,jsx_runtime.jsx)("div",{className:"poster-frame__inner",children:(0,jsx_runtime.jsx)("div",{className:"poster-frame__content",children})})]})},PosterFrame_PosterFrame=PosterFrame;PosterFrame.__docgenInfo={description:"",methods:[],displayName:"PosterFrame"};const StyledPage=styled_components_browser_esm.ZP.div`
  width: 100%;
  position: relative;
  z-index: 2;
  height: 100%;
  min-height: 100%;
  max-width: ${DesignSystem.Wp.size.contentMax};
  margin: 0 auto ${DesignSystem.Wp.spacing["6xl"]};
  box-sizing: border-box;
  padding: ${DesignSystem.Wp.spacing.md};
  &::before {
    content: "";
    position: absolute;
    inset: ${DesignSystem.Wp.spacing.xs};
    border: 5px solid rgba(107, 35, 27, 0.78);
    pointer-events: none;
    z-index: 1;
  }
  &::after {
    content: "";
    position: absolute;
    inset: ${DesignSystem.Wp.spacing.md};
    border: 1.5px solid var(--frame-inner-color, rgba(103, 78, 61, 0.65));
    pointer-events: none;
    z-index: 1;
  }
`,StyledPageTexture=styled_components_browser_esm.ZP.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  > * {
    width: 100%;
    height: 100%;
  }
`,StyledPageContent=styled_components_browser_esm.ZP.div`
  position: relative;
  z-index: 2;
`,Corner=(styled_components_browser_esm.ZP.div`
  min-height: 100vh;
  padding: 12px;
  position: relative;
  box-sizing: border-box;
  overflow-x: clip;
  @media (max-width: 768px) {
    padding: 10px;
  }
`,styled_components_browser_esm.ZP.div`
  min-height: calc(100vh - 24px);
  border: 2px solid var(--frame-border, #8b1e1e);
  position: relative;
  background: transparent;
  box-sizing: border-box;
  padding: 24px 24px 40px;
  z-index: 1;
  @media (max-width: 768px) {
    min-height: calc(100vh - 20px);
    padding: 18px 16px 28px;
  }
  &::before {
    content: "";
    position: absolute;
    inset: 6px;
    border: 1px solid var(--frame-border, #8b1e1e);
    pointer-events: none;
  }
`,styled_components_browser_esm.ZP.div`
  position: absolute;
  width: 32px;
  height: 32px;
  color: var(--frame-border, #8b1e1e);
  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`),HeaderContainer=((0,styled_components_browser_esm.ZP)(Corner)`
  top: -2px;
  left: -2px;
`,(0,styled_components_browser_esm.ZP)(Corner)`
  top: -2px;
  right: -2px;
  transform: rotate(90deg);
`,(0,styled_components_browser_esm.ZP)(Corner)`
  bottom: -2px;
  left: -2px;
  transform: rotate(-90deg);
`,(0,styled_components_browser_esm.ZP)(Corner)`
  bottom: -2px;
  right: -2px;
  transform: rotate(180deg);
`,styled_components_browser_esm.ZP.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: calc(env(safe-area-inset-top, 0px) + 4.75rem);
  background: #000;
  pointer-events: none;
  z-index: 2001;
`,styled_components_browser_esm.ZP.div`
  position: relative;
  z-index: 2002;
  display: flex;
  justify-content: center;
  width: 100%;
`),NorenContainer=styled_components_browser_esm.ZP.div`
  left: 0;
  right: 0;
`,FixedBottomFade=styled_components_browser_esm.ZP.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 300px;
  pointer-events: none;
  z-index: 999;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 95%
  );
`,FixedBottomWarp=styled_components_browser_esm.ZP.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -400px;
  height: 500px;
  margin-top: -140px;
  pointer-events: none;
  z-index: 1;
  opacity: 0.9;
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  > * {
    width: 100%;
    height: 100%;
  }
`,FixedTopFade=styled_components_browser_esm.ZP.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 600px;
  pointer-events: none;
  z-index: 2000;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.01) 36%,
    rgba(0, 0, 0, 0.04) 52%,
    rgba(0, 0, 0, 0.1) 66%,
    rgba(0, 0, 0, 0.22) 76%,
    rgba(0, 0, 0, 0.4) 84%,
    rgba(0, 0, 0, 0.58) 90%,
    rgba(0, 0, 0, 0.74) 94%,
    rgba(0, 0, 0, 0.88) 98%,
    rgba(0, 0, 0, 0.95) 100%
  );
`,IosNotchBuffer=(styled_components_browser_esm.ZP.div`
  display: flex;
  justify-content: center;
  margin: ${DesignSystem.Wp.spacing.none};
  padding: ${DesignSystem.Wp.spacing.xxl} ${DesignSystem.Wp.spacing.none};
  height: 100%;
`,styled_components_browser_esm.ZP.div`
  position: relative;
  margin: ${DesignSystem.Wp.spacing.none} ${DesignSystem.Wp.spacing.lg};
  padding: ${DesignSystem.Wp.spacing.none} ${DesignSystem.Wp.spacing["5xl"]};
  width: 100%;
  max-width: ${DesignSystem.Wp.size.contentMax};
  min-height: ${DesignSystem.Wp.size.pageMinHeight};
  box-sizing: border-box;
  border: ${DesignSystem.Wp.borderWidth.strong} solid
    ${props=>getColors(props.theme).accent};
`,styled_components_browser_esm.ZP.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: env(safe-area-inset-top, 0px);
  background: black;
  pointer-events: none;
  z-index: 1990;
`);var ServicesNoren=__webpack_require__("./src/Components/ServicesNoren/index.tsx");const Layout=_ref=>{let{children}=_ref;const{theme}=useTheme(),colors=getColors(theme);return(0,jsx_runtime.jsxs)(PosterFrame_PosterFrame,{children:[(0,jsx_runtime.jsx)(IosNotchBuffer,{theme}),(0,jsx_runtime.jsx)(FixedTopFade,{"aria-hidden":"true"}),(0,jsx_runtime.jsx)(FixedTopFade,{"aria-hidden":"true"}),(0,jsx_runtime.jsx)(HeaderContainer,{children:(0,jsx_runtime.jsx)(Components_Header,{})}),(0,jsx_runtime.jsx)(NorenContainer,{children:(0,jsx_runtime.jsx)(ServicesNoren.Z,{color:colors.brandDarkest,height:200,width:100,labels:["轟","隆","紅","龍","音","樂","製","作","工","作","室"]})}),(0,jsx_runtime.jsxs)(StyledPage,{children:[(0,jsx_runtime.jsx)(StyledPageTexture,{"aria-hidden":"true",children:(0,jsx_runtime.jsx)(paper_texture.Hx,{colorBack:colors.background,colorFront:colors.backgroundAccent,contrast:.12,roughness:1,fiber:.05,fiberSize:.01,crumples:0,crumpleSize:.01,folds:0,foldCount:1,drops:0,fade:0,seed:0,scale:.5,fit:"cover"})}),(0,jsx_runtime.jsxs)(StyledPageContent,{children:[children,(0,jsx_runtime.jsx)(Components_Footer,{})]})]}),(0,jsx_runtime.jsx)(FixedBottomWarp,{"aria-hidden":"true",children:(0,jsx_runtime.jsx)(warp.Y5,{colors:["#a7e58b","#324471","#0b190e"],proportion:.62,softness:1,distortion:.47,swirl:1,swirlIterations:7.6,shape:"edge",shapeScale:.77,speed:6.8,scale:.6,rotation:180})}),(0,jsx_runtime.jsx)(FixedBottomFade,{"aria-hidden":"true"})]})},Components_Layout=Layout;Layout.__docgenInfo={description:"",methods:[],displayName:"Layout",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const Page=_ref=>{let{children}=_ref;return(0,jsx_runtime.jsx)(Components_Layout,{children})},Components_Page=Page;Page.__docgenInfo={description:"",methods:[],displayName:"Page",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const hero_artists_namespaceObject=__webpack_require__.p+"6d2327ca554bb7b2f088.png",icon_poster_mic_c414_namespaceObject=__webpack_require__.p+"e85d87b8a8ab86c963fa.png",icon_poster_mic_beta52a_namespaceObject=__webpack_require__.p+"1832f2d84874cc0a5840.png",icon_poster_mic_e906_namespaceObject=__webpack_require__.p+"8c976ec6650560642093.png",icon_poster_mic_md421_namespaceObject=__webpack_require__.p+"d93ed358137a07f9d1ce.png",icon_poster_mic_nt5_namespaceObject=__webpack_require__.p+"dbd0c3ea515968d3c8e3.png",icon_poster_mic_sm57_namespaceObject=__webpack_require__.p+"36cb31717b5aa62fbd59.png",icon_poster_mic_sm58_namespaceObject=__webpack_require__.p+"053750a9e3f6ba5cf458.png",HomeShell=styled_components_browser_esm.ZP.div`
  display: flex;
  flex-direction: column;
  gap: ${DesignSystem.Wp.spacing.xl};
  color: ${_ref=>{let{theme}=_ref;return getColors(theme).text}};
`,Panel=styled_components_browser_esm.ZP.section`
  ${_ref2=>{let{noPadding}=_ref2;return noPadding?styled_components_browser_esm.iv`
          padding: ${DesignSystem.Wp.spacing.none};
        `:styled_components_browser_esm.iv`
          padding: ${DesignSystem.Wp.spacing.xl};
        `}}
  ${_ref3=>{let{bordered}=_ref3;return bordered?styled_components_browser_esm.iv`
          border-top: ${DesignSystem.Wp.borderWidth.thin} solid var(--frame-inner-color);
          border-bottom: ${DesignSystem.Wp.borderWidth.thin} solid var(--frame-inner-color);
        `:""}}
  ${_ref4=>{let{borderBottomOnly}=_ref4;return borderBottomOnly?styled_components_browser_esm.iv`
          border-bottom: ${DesignSystem.Wp.borderWidth.thin} solid var(--frame-inner-color);
        `:""}}
`,ServicesPanelShell=styled_components_browser_esm.ZP.div`
  position: relative;
  padding: ${DesignSystem.Wp.spacing["5xl"]};
`,HeroGrid=styled_components_browser_esm.ZP.div`
  display: grid;
  gap: ${DesignSystem.Wp.spacing.xl};
  ${DesignSystem.BC.lg} {
    grid-template-columns: 0.8fr 1.2fr;
  }
`,Headline=styled_components_browser_esm.ZP.h1`
  font-family: var(--font-headline);
  font-size: ${DesignSystem.Wp.fontSize["6xl"]};
  line-height: ${DesignSystem.Wp.lineHeight.tight};
  margin-bottom: ${DesignSystem.Wp.spacing.md};
`,SubHeading=styled_components_browser_esm.ZP.h2`
  font-family: var(--font-subheadline);
  color: ${_ref5=>{let{theme}=_ref5;return getColors(theme).primary}};
  font-size: ${DesignSystem.Wp.fontSize["3xl"]};
  line-height: ${DesignSystem.Wp.lineHeight.compact};
  margin-bottom: ${DesignSystem.Wp.spacing.sm};
  ${_ref6=>{let{borderTop,theme}=_ref6;return borderTop?styled_components_browser_esm.iv`
          border-top: ${DesignSystem.Wp.borderWidth.thin} solid
            ${getColors(theme).subheadingBorder};
          padding-top: ${DesignSystem.Wp.spacing.sm};
        `:""}}
`,Body=styled_components_browser_esm.ZP.p`
  font-family: var(--font-body);
  color: ${_ref7=>{let{theme}=_ref7;return getColors(theme).textMuted}};
  font-size: ${DesignSystem.Wp.fontSize.lg};
  line-height: ${DesignSystem.Wp.lineHeight.normal};
`,PrimaryButton=styled_components_browser_esm.ZP.button`
  margin-top: ${DesignSystem.Wp.spacing.xl};
  border: ${DesignSystem.Wp.borderWidth.thin} solid
    ${_ref8=>{let{theme}=_ref8;return getColors(theme).primary}};
  color: ${_ref9=>{let{theme}=_ref9;return getColors(theme).primary}};
  background: ${_ref0=>{let{theme}=_ref0;return getColors(theme).background}};
  border-radius: ${DesignSystem.Wp.radius.md};
  position: relative;
  overflow: hidden;
  padding: ${DesignSystem.Wp.spacing.md} ${DesignSystem.Wp.spacing["4xl"]}
    ${DesignSystem.Wp.spacing.md} ${DesignSystem.Wp.spacing.xl};
  min-width: 14rem;
  font-size: ${DesignSystem.Wp.fontSize.md};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.3s cubic-bezier(0.9, 0, 0.1, 1);
  &:hover {
    color: ${_ref1=>{let{theme}=_ref1;return getColors(theme).background}};
  }
`,PrimaryButtonText=styled_components_browser_esm.ZP.span`
  position: relative;
  z-index: 3;
`,PrimaryButtonFill=styled_components_browser_esm.ZP.span`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3.25rem;
  background: ${_ref10=>{let{theme}=_ref10;return getColors(theme).primary}};
  border-radius: ${DesignSystem.Wp.radius.md} ${DesignSystem.Wp.radius.md}
    ${DesignSystem.Wp.radius.md} 0;
  z-index: 1;
  transition: width 0.3s cubic-bezier(0.9, 0, 0.1, 1),
    border-radius 0.3s cubic-bezier(0.9, 0, 0.1, 1);
  ${PrimaryButton}:hover & {
    width: 100%;
    border-radius: ${DesignSystem.Wp.radius.md};
  }
`,PrimaryButtonArrow=styled_components_browser_esm.ZP.span`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3.25rem;
  color: ${_ref11=>{let{theme}=_ref11;return getColors(theme).background}};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 4;
`,HeroPlaceholder=styled_components_browser_esm.ZP.div`
  position: relative;
  min-height: 24rem;
  display: grid;
  place-items: center;
  width: 100%;
  color: ${_ref12=>{let{theme}=_ref12;return getColors(theme).textMuted}};
  font-size: ${DesignSystem.Wp.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`,HeroLogo=styled_components_browser_esm.ZP.img`
  position: absolute;
  bottom: -61px;
  right: -100px;
  height: 128%;
`,ThreeCol=(styled_components_browser_esm.ZP.div`
  font-family: Chinese1;
  font-size: ${DesignSystem.Wp.fontSize["5xl"]};
  color: ${_ref13=>{let{theme}=_ref13;return getColors(theme).primary}};
  position: absolute;
  top: ${DesignSystem.Wp.spacing.lg};
  right: ${DesignSystem.Wp.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
`,styled_components_browser_esm.ZP.p`
  margin: 0;
`,styled_components_browser_esm.ZP.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: ${DesignSystem.Wp.spacing.xl};
  ${DesignSystem.BC.lg} {
    grid-template-columns: 0.7fr 1.3fr 0.8fr;
  }
`),ServicesList=styled_components_browser_esm.ZP.div`
  display: grid;
  gap: ${DesignSystem.Wp.spacing.md};
`,ServiceRow=styled_components_browser_esm.ZP.div`
  border-top: ${DesignSystem.Wp.borderWidth.thin} solid ${_ref14=>{let{theme}=_ref14;return getColors(theme).border}};
  padding-top: ${DesignSystem.Wp.spacing.md};
  display: flex;
  gap: ${DesignSystem.Wp.spacing.md};
  align-items: baseline;
`,ServiceIndex=styled_components_browser_esm.ZP.span`
  color: ${_ref15=>{let{theme}=_ref15;return getColors(theme).primary}};
  min-width: 1.8rem;
  font-size: ${DesignSystem.Wp.fontSize.lg};
`,ServiceName=styled_components_browser_esm.ZP.span`
  font-size: ${DesignSystem.Wp.fontSize.xl};
`,ToolsSectionBackground=styled_components_browser_esm.ZP.div`
  position: relative;
  overflow-x: hidden;
  overflow-y: visible;
  margin: 0 2px;
  background: linear-gradient(180deg, ${_ref16=>{let{$topColor}=_ref16;return $topColor}} 0%, #000000 100%);
`,ToolsSectionTexture=styled_components_browser_esm.ZP.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.08;
  z-index: 0;
  > * {
    width: 100%;
    height: 100%;
  }
`,ToolsSectionTopTexture=styled_components_browser_esm.ZP.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.25;
  -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
  > * {
    width: 100%;
    height: 100%;
  }
`,ToolsSectionContent=styled_components_browser_esm.ZP.div`
  position: relative;
  z-index: 2;
`,ToolsSideFadeOverlay=styled_components_browser_esm.ZP.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0) 10%,
    rgba(0, 0, 0, 0) 90%,
    rgba(0, 0, 0, 0.95) 100%
  );
`,ToolTile=styled_components_browser_esm.ZP.div`
  padding: ${DesignSystem.Wp.spacing.lg};
  min-height: 14rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`,ToolLabel=styled_components_browser_esm.ZP.p`
  margin-top: ${DesignSystem.Wp.spacing.md};
  font-size: ${DesignSystem.Wp.fontSize.md};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`,ToolIcon=styled_components_browser_esm.ZP.img`
  width: 300px;
  max-width: 100%;
  height: 300px;
  max-height: 100%;
  object-fit: contain;
  background: transparent;
`,CarouselViewport=(styled_components_browser_esm.ZP.p`
  color: ${_ref17=>{let{theme}=_ref17;return getColors(theme).primary}};
  font-size: ${DesignSystem.Wp.fontSize.sm};
  margin-bottom: ${DesignSystem.Wp.spacing.md};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  overflow: visible;
`,styled_components_browser_esm.ZP.div`
  position: relative;
  overflow-x: hidden;
  overflow-y: visible;
  cursor: grab;
  touch-action: pan-y;
`),CarouselContainer=styled_components_browser_esm.ZP.div`
  position: relative;
  z-index: 1;
  overflow: visible;
  display: flex;
  margin-left: -${DesignSystem.Wp.spacing.md};
  padding-bottom: ${DesignSystem.Wp.spacing["3xl"]};
  transition-timing-function: ease-in-out;
`,CarouselSlide=styled_components_browser_esm.ZP.div`
  min-width: 0;
  flex: 0 0 90%;
  padding-left: ${DesignSystem.Wp.spacing.md};
  position: relative;
  ${_ref18=>{let{$showSeparator,theme}=_ref18;return $showSeparator?styled_components_browser_esm.iv`
          &::after {
            content: "";
            position: absolute;
            bottom: ${DesignSystem.Wp.spacing.lg};
            right: calc(-${DesignSystem.Wp.spacing.md} / 2);
            transform: translate(50%, -50%);
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 999px;
            background: ${getColors(theme).danger};
            box-shadow: 0 0 5rem ${`${getColors(theme).danger}99`};
          }
        `:""}}
  ${DesignSystem.BC.md} {
    flex: 0 0 48%;
  }
  ${DesignSystem.BC.lg} {
    flex: 0 0 32%;
  }
`,ViewFullGearLink=(0,styled_components_browser_esm.ZP)(chunk_EVOBXE3Y.rU)`
  border: ${_ref19=>{let{borderless,theme}=_ref19;return borderless?"none":`${DesignSystem.Wp.borderWidth.thin} solid ${getColors(theme).primary}`}};
  color: ${_ref20=>{let{theme}=_ref20;return getColors(theme).primary}};
  padding: ${DesignSystem.Wp.spacing.sm} ${DesignSystem.Wp.spacing.lg};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  display: block;
  position: absolute;
  bottom: ${DesignSystem.Wp.spacing.sm};
  right: ${DesignSystem.Wp.spacing.sm};
  white-space: nowrap;
  z-index: 3;
`,CTA=(styled_components_browser_esm.ZP.div`
  width: 100%;
  height: auto;
  color: ${_ref21=>{let{theme}=_ref21;return getColors(theme).text}};
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 100%;
    height: auto;
    display: block;
  }
  path,
  line,
  circle,
  rect,
  polygon,
  polyline {
    fill: currentColor;
    stroke: currentColor;
    stroke-width: 0.0001;
  }
`,styled_components_browser_esm.ZP.div`
  padding: ${DesignSystem.Wp.spacing["5xl"]};
  text-align: center;
`),services=["Recording","Mixing","Production","Session Work"],toolStickers=[{name:"AKG C414 XLS",icon:icon_poster_mic_c414_namespaceObject},{name:"Shure Beta 52A",icon:icon_poster_mic_beta52a_namespaceObject},{name:"Sennheiser e906",icon:icon_poster_mic_e906_namespaceObject},{name:"Sennheiser MD421-2",icon:icon_poster_mic_md421_namespaceObject},{name:"Rode NT5",icon:icon_poster_mic_nt5_namespaceObject},{name:"Shure SM57",icon:icon_poster_mic_sm57_namespaceObject},{name:"Shure SM58",icon:icon_poster_mic_sm58_namespaceObject}],Home=()=>{const{theme}=useTheme(),openContactMail=()=>{window.location.assign("mailto:contact@reddragonrecords.tw")},[emblaRef,emblaApi]=(0,embla_carousel_react_esm.Z)({loop:!0,align:"start",dragFree:!0,skipSnaps:!0},[(0,embla_carousel_wheel_gestures_esm.Z)({forceWheelAxis:"x"})]),autoplayRef=react.useRef(null),resetRef=react.useRef(null),clearAutoplay=react.useCallback(()=>{autoplayRef.current&&(window.clearInterval(autoplayRef.current),autoplayRef.current=null),resetRef.current&&(window.clearTimeout(resetRef.current),resetRef.current=null)},[]),startAutoplay=react.useCallback(()=>{emblaApi&&(clearAutoplay(),autoplayRef.current=window.setInterval(()=>{emblaApi.scrollNext()},3e3))},[emblaApi,clearAutoplay]),pauseAndResumeAutoplay=react.useCallback(()=>{clearAutoplay(),resetRef.current=window.setTimeout(()=>{startAutoplay()},3500)},[clearAutoplay,startAutoplay]);react.useEffect(()=>{if(emblaApi)return emblaApi.on("pointerDown",pauseAndResumeAutoplay),startAutoplay(),()=>{emblaApi.off("pointerDown",pauseAndResumeAutoplay),clearAutoplay()}},[emblaApi,clearAutoplay,pauseAndResumeAutoplay,startAutoplay]);const colors=getColors(theme),toolsBackgroundColor=colors.background,toolsDetailColor=((hex,amount)=>{const normalized=hex.replace("#",""),expanded=3===normalized.length?normalized.split("").map(char=>`${char}${char}`).join(""):normalized;if(6!==expanded.length)return hex;const parsed=Number.parseInt(expanded,16);if(Number.isNaN(parsed))return hex;const green=parsed>>8&255,blue=255&parsed,brighten=channel=>Math.min(255,Math.round(channel+(255-channel)*amount));return`#${[brighten(parsed>>16&255),brighten(green),brighten(blue)].map(channel=>channel.toString(16).padStart(2,"0")).join("")}`})(colors.danger,.35);return(0,jsx_runtime.jsx)(Components_Page,{children:(0,jsx_runtime.jsxs)(HomeShell,{theme,children:[(0,jsx_runtime.jsx)(Panel,{theme,borderBottomOnly:!0,children:(0,jsx_runtime.jsxs)(HeroGrid,{children:[(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsxs)(Headline,{children:["RED",(0,jsx_runtime.jsx)("br",{}),"DRAGON",(0,jsx_runtime.jsx)("br",{}),"RECORDS"]}),(0,jsx_runtime.jsx)(SubHeading,{theme,borderTop:!0,children:"Tainan Record Company"}),(0,jsx_runtime.jsx)(Body,{theme,children:"Analog methadologies. Music made by humans. Love for the craft."}),(0,jsx_runtime.jsxs)(PrimaryButton,{theme,onClick:openContactMail,children:[(0,jsx_runtime.jsx)(PrimaryButtonText,{children:"Enter The Studio"}),(0,jsx_runtime.jsx)(PrimaryButtonFill,{theme}),(0,jsx_runtime.jsx)(PrimaryButtonArrow,{theme,children:"→"})]})]}),(0,jsx_runtime.jsx)(HeroPlaceholder,{theme,children:(0,jsx_runtime.jsx)(HeroLogo,{src:hero_artists_namespaceObject,alt:"Red Dragon Records artists"})})]})}),(0,jsx_runtime.jsx)(Panel,{theme,borderBottomOnly:!0,noPadding:!0,children:(0,jsx_runtime.jsx)(ServicesPanelShell,{children:(0,jsx_runtime.jsxs)(ThreeCol,{children:[(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(SubHeading,{theme,children:"Services"}),(0,jsx_runtime.jsx)(ServicesList,{children:services.map((service,index)=>(0,jsx_runtime.jsxs)(ServiceRow,{theme,children:[(0,jsx_runtime.jsx)(ServiceIndex,{theme,children:`0${index+1}`}),(0,jsx_runtime.jsx)(ServiceName,{children:service})]},service))})]}),(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(SubHeading,{theme,children:"Created By Music Lovers. Built on the shoulders of giants."}),(0,jsx_runtime.jsx)(Body,{theme,children:"Red Dragon Records is a recording studio and creative base. Cement your creative ambitions into a permanent realisation."})]})]})})}),(0,jsx_runtime.jsx)(Panel,{theme,bordered:!0,noPadding:!0,children:(0,jsx_runtime.jsxs)(ToolsSectionBackground,{$topColor:toolsBackgroundColor,children:[(0,jsx_runtime.jsx)(ToolsSectionTexture,{"aria-hidden":"true",children:(0,jsx_runtime.jsx)(paper_texture.Hx,{colorBack:toolsBackgroundColor,colorFront:toolsDetailColor,contrast:.06,roughness:1,fiber:.1,fiberSize:.01,crumples:.08,crumpleSize:.01,folds:.04,foldCount:1,drops:0,fade:0,seed:0,scale:.5,fit:"cover"})}),(0,jsx_runtime.jsx)(ToolsSectionTopTexture,{"aria-hidden":"true",children:(0,jsx_runtime.jsx)(paper_texture.Hx,{colorBack:colors.background,colorFront:colors.danger,contrast:.04,roughness:1,fiber:.16,fiberSize:.016,crumples:.14,crumpleSize:.016,folds:.06,foldCount:1.2,drops:.03,fade:0,seed:2,scale:.65,fit:"cover"})}),(0,jsx_runtime.jsxs)(ToolsSectionContent,{children:[(0,jsx_runtime.jsx)(ToolsSideFadeOverlay,{}),(0,jsx_runtime.jsx)(CarouselViewport,{ref:emblaRef,onWheel:pauseAndResumeAutoplay,children:(0,jsx_runtime.jsx)(CarouselContainer,{children:toolStickers.map((_ref,index)=>{let{name,icon}=_ref;return(0,jsx_runtime.jsx)(CarouselSlide,{theme,$showSeparator:!0,children:(0,jsx_runtime.jsxs)(ToolTile,{theme,children:[(0,jsx_runtime.jsx)(ToolIcon,{src:icon,alt:name}),(0,jsx_runtime.jsx)(ToolLabel,{children:name})]})},name)})})}),(0,jsx_runtime.jsx)(ViewFullGearLink,{to:"/equipment",theme,borderless:!0,children:"View Full Gear List →"})]})]})}),(0,jsx_runtime.jsxs)(CTA,{theme,children:[(0,jsx_runtime.jsx)(SubHeading,{theme,children:"Enter The Studio"}),(0,jsx_runtime.jsx)(Body,{theme,children:"Make something authentic."}),(0,jsx_runtime.jsxs)(PrimaryButton,{theme,onClick:openContactMail,children:[(0,jsx_runtime.jsx)(PrimaryButtonText,{children:"Get In Touch"}),(0,jsx_runtime.jsx)(PrimaryButtonFill,{theme}),(0,jsx_runtime.jsx)(PrimaryButtonArrow,{theme,children:"→"})]})]})]})})},Pages_Home=Home;Home.__docgenInfo={description:"",methods:[],displayName:"Home"};const record_namespaceObject=__webpack_require__.p+"6e8210d9627f296fa760.png",FullPageImage=(__webpack_require__.p,__webpack_require__.p,__webpack_require__.p,__webpack_require__.p,__webpack_require__.p,styled_components_browser_esm.ZP.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;


  ${DesignSystem.BC.sm} {
    padding-top: ${DesignSystem.Wp.spacing.xl};
  }
`),Logo=styled_components_browser_esm.ZP.img`
  position: static;
  flex: 0 1 auto;
  max-width: 100%;
  height: min-content;
  object-fit: contain;
  margin-bottom: ${DesignSystem.Wp.spacing["4xl"]};
  overflow: hidden;

  ${DesignSystem.BC.sm} {
    max-width: 37.5rem;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  animation: rotation ${DesignSystem.Wp.duration.spin} infinite linear;
`,Subtext=styled_components_browser_esm.ZP.p`
  color: ${props=>getColors(props.theme).primary};
  flex: 1 0 auto;
  font-family: "MyFont2";
  font-size: ${DesignSystem.Wp.fontSize["2xl"]};
  text-align: center;
  bottom: 0;
  padding-bottom: ${DesignSystem.Wp.spacing.xl};

  ${DesignSystem.BC.sm} {
    font-size: ${DesignSystem.Wp.fontSize["5xl"]};
  }
`,VerticalBanner=styled_components_browser_esm.ZP.div`
  font-family: Chinese1;
  font-size: 15vw;
  color: ${props=>getColors(props.theme).primary};
  position: absolute;
  padding: ${DesignSystem.Wp.spacing.none} ${DesignSystem.Wp.spacing.md};
  top: 0;
  right: ${DesignSystem.Wp.spacing["4xl"]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  ${DesignSystem.BC.sm} {
    font-size: ${DesignSystem.Wp.fontSize["6xl"]};
  }
`,LogoWrapper=styled_components_browser_esm.ZP.div`
  position: relative;
  min-width: min-content;
  min-height: min-content;
`,Character=styled_components_browser_esm.ZP.p`
  flex: 1 1 auto;
`,EmailTo=styled_components_browser_esm.ZP.a`
  text-decoration: none;
  color: #fff;
  font-family: "MyFont2";
  font-size: ${DesignSystem.Wp.fontSize["2xl"]};
  transition: ${DesignSystem.Wp.duration.normal};
  :hover {
    color: #dc2626;
  }
`,Header=styled_components_browser_esm.ZP.h1`
  font-family: "Chinglish1";
  color: ${props=>getColors(props.theme).primary};
  font-size: ${DesignSystem.Wp.fontSize["5xl"]};
  line-height: ${DesignSystem.Wp.lineHeight.tight};
`,ComingSoon=()=>{const{theme}=useTheme();return(0,jsx_runtime.jsxs)(FullPageImage,{theme,children:[(0,jsx_runtime.jsxs)(LogoWrapper,{children:[(0,jsx_runtime.jsx)(Logo,{src:record_namespaceObject}),(0,jsx_runtime.jsxs)(VerticalBanner,{theme,children:[(0,jsx_runtime.jsx)(Character,{children:"轟"}),(0,jsx_runtime.jsx)(Character,{children:"隆"}),(0,jsx_runtime.jsx)(Character,{children:"紅"}),(0,jsx_runtime.jsx)(Character,{children:"龍"})]})]}),(0,jsx_runtime.jsxs)(Subtext,{theme,children:[(0,jsx_runtime.jsx)(Header,{theme,children:"RED DRAGON RECORDS"}),(0,jsx_runtime.jsx)("p",{children:"Coming soon..."}),(0,jsx_runtime.jsx)(EmailTo,{href:"mailto: contact@reddragonrecords.tw",children:"Enquiries"})]})]})},Pages_ComingSoon=ComingSoon;ComingSoon.__docgenInfo={description:"",methods:[],displayName:"ComingSoon"};styled_components_browser_esm.ZP.div`
  color: ${_ref=>{let{theme}=_ref;return getColors(theme).text}};
  padding: ${DesignSystem.Wp.spacing.xl};
`,styled_components_browser_esm.ZP.h1`
  font-family: var(--font-headline);
  color: ${_ref2=>{let{theme}=_ref2;return getColors(theme).primary}};
  font-size: ${DesignSystem.Wp.fontSize["5xl"]};
  line-height: ${DesignSystem.Wp.lineHeight.tight};
  margin-bottom: ${DesignSystem.Wp.spacing.lg};
`,styled_components_browser_esm.ZP.section`
  position: relative;
  overflow: hidden;
  height: min(76vh, 56rem);
  border: ${DesignSystem.Wp.borderWidth.thin} solid ${_ref3=>{let{theme}=_ref3;return getColors(theme).border}};
  cursor: grab;
  touch-action: pan-y;
`;const leaveToTopLeft=styled_components_browser_esm.F4`
  from {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
  to {
    transform: translate3d(-28%, -28%, 0) scale(0.96);
    opacity: 0;
  }
`,enterFromBottomRight=styled_components_browser_esm.F4`
  from {
    transform: translate3d(28%, 28%, 0) scale(1.04);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
`,leaveToBottomRight=styled_components_browser_esm.F4`
  from {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
  to {
    transform: translate3d(28%, 28%, 0) scale(0.96);
    opacity: 0;
  }
`,enterFromTopLeft=styled_components_browser_esm.F4`
  from {
    transform: translate3d(-28%, -28%, 0) scale(1.04);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 1;
  }
`,Artists=(styled_components_browser_esm.ZP.article`
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-rows: auto 1fr;
  background: ${_ref4=>{let{theme}=_ref4;return getColors(theme).background}};
  ${_ref5=>{let{$mode,$elastic}=_ref5;return"active"===$mode?styled_components_browser_esm.iv`
          transform: translate3d(${-.18*$elastic}px, ${-.18*$elastic}px, 0);
          transition: transform 140ms ease-out;
        `:styled_components_browser_esm.iv`
          transition: none;
        `}}
  ${_ref6=>{let{$mode,$direction}=_ref6;return"leaving"===$mode&&1===$direction?styled_components_browser_esm.iv`
          animation: ${leaveToTopLeft} 540ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        `:""}}
  ${_ref7=>{let{$mode,$direction}=_ref7;return"entering"===$mode&&1===$direction?styled_components_browser_esm.iv`
          animation: ${enterFromBottomRight} 540ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        `:""}}
  ${_ref8=>{let{$mode,$direction}=_ref8;return"leaving"===$mode&&-1===$direction?styled_components_browser_esm.iv`
          animation: ${leaveToBottomRight} 540ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        `:""}}
  ${_ref9=>{let{$mode,$direction}=_ref9;return"entering"===$mode&&-1===$direction?styled_components_browser_esm.iv`
          animation: ${enterFromTopLeft} 540ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        `:""}}
`,styled_components_browser_esm.ZP.div`
  padding: ${DesignSystem.Wp.spacing.lg};
  border-bottom: ${DesignSystem.Wp.borderWidth.thin} solid ${_ref0=>{let{theme}=_ref0;return getColors(theme).border}};
  display: grid;
  gap: ${DesignSystem.Wp.spacing.xs};
`,styled_components_browser_esm.ZP.h2`
  color: ${_ref1=>{let{theme}=_ref1;return getColors(theme).primary}};
  font-size: ${DesignSystem.Wp.fontSize["3xl"]};
`,styled_components_browser_esm.ZP.p`
  font-size: ${DesignSystem.Wp.fontSize.sm};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`,styled_components_browser_esm.ZP.div`
  min-height: 0;
  overflow-y: auto;
  padding: ${DesignSystem.Wp.spacing.lg};
  display: grid;
  gap: ${DesignSystem.Wp.spacing.lg};
  scrollbar-width: thin;
  scrollbar-color: ${_ref10=>{let{theme}=_ref10;return getColors(theme).primary}} transparent;
`,styled_components_browser_esm.ZP.p`
  color: ${_ref11=>{let{theme}=_ref11;return getColors(theme).textMuted}};
  font-size: ${DesignSystem.Wp.fontSize.md};
  line-height: ${DesignSystem.Wp.lineHeight.normal};
`,styled_components_browser_esm.ZP.div`
  display: grid;
  gap: ${DesignSystem.Wp.spacing.sm};
  grid-template-columns: repeat(2, minmax(0, 1fr));
`,styled_components_browser_esm.ZP.div`
  border: ${DesignSystem.Wp.borderWidth.thin} solid ${_ref12=>{let{theme}=_ref12;return getColors(theme).border}};
  min-height: 8rem;
  display: grid;
  place-items: center;
  font-size: ${DesignSystem.Wp.fontSize.xs};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`,styled_components_browser_esm.ZP.ul`
  margin: 0;
  padding-left: ${DesignSystem.Wp.spacing.lg};
  display: grid;
  gap: ${DesignSystem.Wp.spacing.xs};
`,styled_components_browser_esm.ZP.li`
  font-size: ${DesignSystem.Wp.fontSize.sm};
`,()=>(0,jsx_runtime.jsx)(Components_Page,{children:(0,jsx_runtime.jsx)(Pages_ComingSoon,{})})),Pages_Artists=Artists;Artists.__docgenInfo={description:"",methods:[],displayName:"Artists"};const Contact=()=>(react.useEffect(()=>{window.location.href="mailto:contact@reddragonrecords.tw"},[]),(0,jsx_runtime.jsx)(chunk_EVOBXE3Y.Fg,{to:"/home",replace:!0})),Pages_Contact=Contact;Contact.__docgenInfo={description:"",methods:[],displayName:"Contact"};const equipmentByCategory=[{category:"Guitars",items:["Fender Stratocaster USA 2000s","Fender Telecaster USA 2000s","Fender Jazzmaster 65 Reissue USA 2010s","Fender Jaguar MIJ 1990s","Fender Precision Bass CIJ 1990s","Gibson SG 62 Reissue USA 2020","Epiphone Korea 1990s","Godin Radiator CANADA 2000s","Morris W-50 Japan 1970s"]},{category:"Amplifiers",items:["Marshall 100w JVM410h","Laney 5w L5 Lionheart studio","Blackstart 5w HT5"]},{category:"Microphones",items:["1x AKG C414 xls","2x Rode NT5","1x Shure Beta 52a","2x Shure SM57","2x Shure SM58","1x Sennheiser e906","2x Sennheiser MD421-2"]},{category:"Hardware",items:["Allen & Heath Zed 421","Audient ID22","Focusrite Clarret+ Octopre","La-2a Compressor Golden Age Project Comp-2a","1176 Compressor Black Lion Audio Bluey","2x DBX166 Bus Compressor","Drawmer DS201 Gate","1073 EQ Golden Age Project EQ73mk 2","Lexicon Reverb","TC Electronic Digital Delay Processor","Akai X-1000 Reel to Reel tape machine","Palmer DiCappo Reamplification box","Yamaha HS-8 Studio Monitors","M-Audio 49key Midi Controller"]},{category:"Drums",items:["Ludwig Classic Maple 14x22 Kick","Ludwig Classic Maple 16x16 Floor Tom","Ludwig Classic Maple 9x13 Rack Rom","Ludwig Black Beauty 14x6.5 Snare",'Paiste 2oo2 Black Label 14" Hihat','Paiste 2oo2 14" Hihat','Paiste 2oo2 16" Crash','Paiste 2oo2 18" Crash','Paiste 2oo2 20" Ride','Paiste 2oo2 8" Splash',"Auxiliary Percussion"]},{category:"Guitar Pedals",items:["Solid Gold FX If 6 Was 9 Fuzzface","Zvex Fuzz Factory","EHX Rams Head Big Muff","EHX Memory Man","EHX Holy Grain","EHX Pulsar Tremolo","EHX POG Polyphonic Octave","MXR script Phase 90 Phaser","MXR Dynacomp Compressor","MXR Brown Acid Tone Bender","Boss SD-1 Super Overdrive","Boss NS-1x Noise Surpressor","Boss CH-1 Chorus","TC-Electronic Helix Stereo Phaser","TC-Electronic Polytune Nano","Line-6 DL-4 Delay Modeller","Proco Rat Distortion","Vox Satchurator Distortion","Wampler Plexidrive Deluxe Distorion","JHS Ghostly Mids clean boost","Custom Audio Electronics MC404 Wah","Sans-Amp Bass Driver","Digitech Whammy DT","Stone Deaf Parametric EQ Distortion"]}],Shell=styled_components_browser_esm.ZP.div`
  display: flex;
  flex-direction: column;
  gap: ${DesignSystem.Wp.spacing.xl};
  color: ${_ref=>{let{theme}=_ref;return getColors(theme).text}};
`,Section=styled_components_browser_esm.ZP.section`
  border: ${DesignSystem.Wp.borderWidth.thin} solid ${_ref2=>{let{theme}=_ref2;return getColors(theme).border}};
  padding: ${DesignSystem.Wp.spacing.xl};
`,Equipment_Title=styled_components_browser_esm.ZP.h1`
  font-family: var(--font-headline);
  font-size: ${DesignSystem.Wp.fontSize["5xl"]};
  line-height: ${DesignSystem.Wp.lineHeight.tight};
`,CategoryGrid=styled_components_browser_esm.ZP.div`
  display: grid;
  gap: ${DesignSystem.Wp.spacing.lg};
  ${DesignSystem.BC.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`,CategoryCard=styled_components_browser_esm.ZP.article`
  border: ${DesignSystem.Wp.borderWidth.thin} solid ${_ref3=>{let{theme}=_ref3;return getColors(theme).border}};
  padding: ${DesignSystem.Wp.spacing.lg};
`,CategoryTitle=styled_components_browser_esm.ZP.h2`
  color: ${_ref4=>{let{theme}=_ref4;return getColors(theme).primary}};
  font-size: ${DesignSystem.Wp.fontSize.xl};
  margin-bottom: ${DesignSystem.Wp.spacing.sm};
`,List=styled_components_browser_esm.ZP.ul`
  margin: 0;
  padding-left: ${DesignSystem.Wp.spacing.lg};
  display: grid;
  gap: ${DesignSystem.Wp.spacing.xs};
`,Item=styled_components_browser_esm.ZP.li`
  font-size: ${DesignSystem.Wp.fontSize.md};
  line-height: ${DesignSystem.Wp.lineHeight.normal};
`,Equipment=()=>{const{theme}=useTheme();return(0,jsx_runtime.jsx)(Components_Page,{children:(0,jsx_runtime.jsxs)(Shell,{theme,children:[(0,jsx_runtime.jsx)(Section,{theme,children:(0,jsx_runtime.jsx)(Equipment_Title,{children:"Full Equipment List"})}),(0,jsx_runtime.jsx)(Section,{theme,children:(0,jsx_runtime.jsx)(CategoryGrid,{children:equipmentByCategory.map(_ref5=>{let{category,items}=_ref5;return(0,jsx_runtime.jsxs)(CategoryCard,{theme,children:[(0,jsx_runtime.jsx)(CategoryTitle,{theme,children:category}),(0,jsx_runtime.jsx)(List,{children:items.map(item=>(0,jsx_runtime.jsx)(Item,{children:item},item))})]},category)})})})]})})},Pages_Equipment=Equipment;Equipment.__docgenInfo={description:"",methods:[],displayName:"Equipment"};const baseRoutes=[{path:"/home",label:"Home",element:(0,jsx_runtime.jsx)(Pages_Home,{})},{path:"/artists",label:"Artists",element:(0,jsx_runtime.jsx)(Pages_Artists,{})},{path:"/contact",label:"Contact",element:(0,jsx_runtime.jsx)(Pages_Contact,{})},{path:"/equipment",label:"Equipment",element:(0,jsx_runtime.jsx)(Pages_Equipment,{})}],useRouteNavigation=()=>{var _baseRoutes$find$labe,_baseRoutes$find;const navigate=(0,chunk_EVOBXE3Y.s0)(),location=(0,chunk_EVOBXE3Y.TH)();return{options:baseRoutes.map(route=>route.label),selectedOption:null!==(_baseRoutes$find$labe=null===(_baseRoutes$find=baseRoutes.find(route=>route.path===location.pathname))||void 0===_baseRoutes$find?void 0:_baseRoutes$find.label)&&void 0!==_baseRoutes$find$labe?_baseRoutes$find$labe:baseRoutes[0].label,onSelect:selection=>{var _baseRoutes$find2;if("Contact"===selection)return void window.location.assign("mailto:contact@reddragonrecords.tw");const nextPath=null===(_baseRoutes$find2=baseRoutes.find(route=>route.label===selection))||void 0===_baseRoutes$find2?void 0:_baseRoutes$find2.path;nextPath&&nextPath!==location.pathname&&navigate(nextPath)}}},Navbar=_ref=>{let{theme}=_ref;const{options,selectedOption,onSelect}=useRouteNavigation();return(0,jsx_runtime.jsx)(Components_Selector,{theme,options,selectedOption,onSelect})},Components_Navbar=Navbar;Navbar.__docgenInfo={description:"",methods:[],displayName:"Navbar",props:{theme:{required:!0,tsType:{name:"Theme"},description:""},borderless:{required:!1,tsType:{name:"boolean"},description:""}}};const styles_Container=styled_components_browser_esm.ZP.div`
  background: transparent;
  width: 100%;
  height: 100%;
  padding: ${DesignSystem.Wp.spacing.none} ${DesignSystem.Wp.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  overflow: hidden;
  ${DesignSystem.BC.lg} {
    padding: ${DesignSystem.Wp.spacing.none} ${DesignSystem.Wp.spacing.lg};
  }
`,styles_Title=(styled_components_browser_esm.ZP.img`
  height: min-content;
`,styled_components_browser_esm.ZP.h1`
  font-family: "Chinglish1";
  color: ${props=>getColors(props.theme).text};
  display: inline-block;
  font-size: ${DesignSystem.Wp.fontSize["6xl"]};
  line-height: ${DesignSystem.Wp.lineHeight.tight};
  text-align: center;
  margin: 0;
  background: transparent;
  white-space: nowrap;
  transform-origin: center;
`),TitleBadge=_ref=>{let{theme}=_ref;const containerRef=react.useRef(null),titleRef=react.useRef(null),[scale,setScale]=react.useState(1);return react.useLayoutEffect(()=>{const container=containerRef.current,title=titleRef.current;if(!container||!title)return;const syncScale=()=>{const widthRatio=container.clientWidth/title.scrollWidth,heightRatio=container.clientHeight/title.scrollHeight,nextScale=Math.max(Math.min(widthRatio,heightRatio),0);setScale(prev=>Math.abs(prev-nextScale)<.001?prev:nextScale)};syncScale();const ro=new ResizeObserver(syncScale);return ro.observe(container),ro.observe(title),window.addEventListener("resize",syncScale),()=>{ro.disconnect(),window.removeEventListener("resize",syncScale)}},[]),(0,jsx_runtime.jsx)(styles_Container,{ref:containerRef,theme,children:(0,jsx_runtime.jsx)(styles_Title,{ref:titleRef,theme,style:{transform:`scale(${scale})`},children:"Red Dragon Records"})})},Components_TitleBadge=TitleBadge;TitleBadge.__docgenInfo={description:"",methods:[],displayName:"TitleBadge",props:{theme:{required:!0,tsType:{name:"Theme"},description:""},borderless:{required:!1,tsType:{name:"boolean"},description:""}}};const supportedLanguages_namespaceObject=["English","中文"],LanguageSelect=_ref=>{let{theme}=_ref;const[languages]=(0,react.useState)(supportedLanguages_namespaceObject),[language,setLanguage]=(0,react.useState)(languages[0]);return(0,jsx_runtime.jsx)(Components_Selector,{options:languages,selectedOption:language,onSelect:selection=>{setLanguage(selection)},theme})},Language=LanguageSelect;LanguageSelect.__docgenInfo={description:"",methods:[],displayName:"LanguageSelect",props:{theme:{required:!0,tsType:{name:"Theme"},description:""},borderless:{required:!1,tsType:{name:"boolean"},description:""}}};const ThemeToggle_styles_Container=styled_components_browser_esm.ZP.button`
  width: ${DesignSystem.Wp.size.controlSm};
  height: ${DesignSystem.Wp.size.controlLg};
  position: relative;
  border: none;
  direction: rtl;
  cursor: pointer;
  padding: 0.5rem 0px 0.75rem;
`,Sun=styled_components_browser_esm.ZP.div`
  width: ${DesignSystem.Wp.size.iconMd};
  height: ${DesignSystem.Wp.size.iconMd};
  margin: 0;
  padding: 0;
  border-radius: ${DesignSystem.Wp.radius.pill};
  position: absolute;
  z-index: ${DesignSystem.Wp.zIndex.raised};
  top: ${DesignSystem.Wp.spacing.sm};
  box-sizing: border-box;

  ${props=>props.theme===types.Q.LIGHT&&styled_components_browser_esm.iv`
      background-color: ${props=>getColors(props.theme).background};
      right: 0;
      box-shadow: 0 0 2px 2px
        ${props=>getColors(props.theme).accentLight};
      transition: background-color var(--theme-transition-duration)
          var(--theme-transition-easing),
        right var(--theme-transition-duration) var(--theme-transition-easing),
        box-shadow var(--theme-transition-duration)
          var(--theme-transition-easing);
    `}

  ${props=>props.theme===types.Q.DARK&&styled_components_browser_esm.iv`
      background-color: ${props=>getColors(props.theme).background};
      right: ${DesignSystem.Wp.spacing.sm};
      transition: background-color var(--theme-transition-duration)
          var(--theme-transition-easing),
        right var(--theme-transition-duration) var(--theme-transition-easing),
        box-shadow var(--theme-transition-duration)
          var(--theme-transition-easing);
    `}
`,Moon=styled_components_browser_esm.ZP.div`
  width: ${DesignSystem.Wp.size.iconMd};
  height: ${DesignSystem.Wp.size.iconMd};
  margin: 0;
  padding: 0;
  border-radius: ${DesignSystem.Wp.radius.pill};
  background-color: ${props=>getColors(props.theme).text};
  box-sizing: border-box;
  position: absolute;
  top: ${DesignSystem.Wp.spacing.sm};
`,ThemeToggle=_ref=>{let{handleClick,theme}=_ref;return(0,jsx_runtime.jsxs)(ThemeToggle_styles_Container,{onClick:()=>(console.log("handling click... ",theme),void handleClick()),theme,children:[(0,jsx_runtime.jsx)(Sun,{theme}),(0,jsx_runtime.jsx)(Moon,{theme})]})},Components_ThemeToggle=ThemeToggle;ThemeToggle.__docgenInfo={description:"",methods:[],displayName:"ThemeToggle",props:{handleClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},theme:{required:!0,tsType:{name:"Theme"},description:""}}};const syncHeaderPortalTop=el=>{const bottom=el.getBoundingClientRect().bottom;document.documentElement.style.setProperty("--header-portal-top",`${bottom}px`)},CogGlyph=()=>(0,jsx_runtime.jsxs)(CogIconSvg,{viewBox:"0 0 24 24",fill:"none","aria-hidden":!0,children:[(0,jsx_runtime.jsx)("path",{stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",d:"M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.019.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.213-1.281z"}),(0,jsx_runtime.jsx)("path",{stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"})]}),Header_Header=()=>{const{theme,toggleTheme}=useTheme(),[isPastThreshold,setIsPastThreshold]=react.useState(!1),[forceOpaque,setForceOpaque]=react.useState(!1),[navOpen,setNavOpen]=react.useState(!1),[optionsOpen,setOptionsOpen]=react.useState(!1),[sideInsetPx,setSideInsetPx]=react.useState(0),headerRootRef=react.useRef(null),leftSideRef=react.useRef(null),rightSideRef=react.useRef(null),{options,selectedOption,onSelect}=useRouteNavigation();react.useEffect(()=>{const threshold=(spacingValue=>{if(spacingValue.endsWith("rem"))return Number.parseFloat(spacingValue)*Number.parseFloat(window.getComputedStyle(document.documentElement).fontSize);return spacingValue.endsWith("px")?Number.parseFloat(spacingValue):Number.parseFloat(spacingValue)||0})(DesignSystem.Wp.spacing["4xl"]);let lastScrollY=window.scrollY;const handleScroll=()=>{const currentScrollY=window.scrollY,isScrollingUp=currentScrollY<lastScrollY,isScrollingDown=currentScrollY>lastScrollY,pastThreshold=currentScrollY>threshold;setIsPastThreshold(pastThreshold),pastThreshold?isScrollingUp?setForceOpaque(!0):isScrollingDown&&setForceOpaque(!1):setForceOpaque(!0),lastScrollY=currentScrollY};return handleScroll(),window.addEventListener("scroll",handleScroll,{passive:!0}),()=>{window.removeEventListener("scroll",handleScroll)}},[]),react.useLayoutEffect(()=>{const el=headerRootRef.current;if(!el)return;const apply=()=>syncHeaderPortalTop(el);apply();const ro=new ResizeObserver(apply);return ro.observe(el),window.addEventListener("resize",apply),()=>{ro.disconnect(),window.removeEventListener("resize",apply),document.documentElement.style.removeProperty("--header-portal-top")}},[]),react.useLayoutEffect(()=>{if(!navOpen&&!optionsOpen)return;const el=headerRootRef.current;el&&syncHeaderPortalTop(el)},[navOpen,optionsOpen]),react.useLayoutEffect(()=>{const left=leftSideRef.current,right=rightSideRef.current;if(!left||!right)return;const syncSideInset=()=>{const nextInset=Math.max(left.offsetWidth,right.offsetWidth);setSideInsetPx(prev=>prev===nextInset?prev:nextInset)};syncSideInset();const ro=new ResizeObserver(syncSideInset);return ro.observe(left),ro.observe(right),window.addEventListener("resize",syncSideInset),()=>{ro.disconnect(),window.removeEventListener("resize",syncSideInset)}},[]),react.useEffect(()=>{if(!navOpen&&!optionsOpen)return;const onKey=e=>{"Escape"===e.key&&(setNavOpen(!1),setOptionsOpen(!1))};return window.addEventListener("keydown",onKey),()=>window.removeEventListener("keydown",onKey)},[navOpen,optionsOpen]);const portalTarget="undefined"!=typeof document?document.body:null,mobileNavPortal=navOpen&&portalTarget&&(0,react_dom.createPortal)((0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(MobileNavBackdrop,{type:"button","aria-label":"Close navigation",onClick:()=>setNavOpen(!1)}),(0,jsx_runtime.jsx)(MobileNavPanel,{id:"header-mobile-nav",theme,children:options.map(label=>(0,jsx_runtime.jsx)(MobileNavLink,{type:"button",theme,$active:label===selectedOption,onClick:()=>{onSelect(label),setNavOpen(!1)},children:label},label))})]}),portalTarget),optionsPortal=optionsOpen&&portalTarget&&(0,react_dom.createPortal)((0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(OptionsBackdrop,{type:"button","aria-label":"Close",onClick:()=>setOptionsOpen(!1)}),(0,jsx_runtime.jsxs)(OptionsMenuPanel,{theme,role:"dialog","aria-label":"Site options",children:[(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(OptionsMenuLabel,{theme,children:"Language"}),(0,jsx_runtime.jsx)(Language,{theme})]}),(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)(OptionsMenuLabel,{theme,children:"Theme"}),(0,jsx_runtime.jsx)(Components_ThemeToggle,{handleClick:toggleTheme,theme})]})]})]}),portalTarget);return(0,jsx_runtime.jsxs)(StyledHeader,{ref:headerRootRef,$isPastThreshold:isPastThreshold,$forceOpaque:forceOpaque,children:[(0,jsx_runtime.jsxs)(HeaderContent,{$sideInsetPx:sideInsetPx,children:[(0,jsx_runtime.jsxs)(HeaderSide,{ref:leftSideRef,align:"left",children:[(0,jsx_runtime.jsx)(MobileOnly,{children:(0,jsx_runtime.jsxs)(HeaderIconButton,{type:"button",theme,"aria-expanded":navOpen,"aria-controls":"header-mobile-nav","aria-label":"Open navigation menu",onClick:()=>navOpen?setNavOpen(!1):(setOptionsOpen(!1),void setNavOpen(!0)),children:[(0,jsx_runtime.jsx)(BurgerBar,{}),(0,jsx_runtime.jsx)(BurgerBar,{}),(0,jsx_runtime.jsx)(BurgerBar,{})]})}),(0,jsx_runtime.jsx)(DesktopOnly,{children:(0,jsx_runtime.jsx)(Components_Navbar,{theme})})]}),(0,jsx_runtime.jsx)(TitleLogoContainer,{children:(0,jsx_runtime.jsx)(Components_TitleBadge,{theme})}),(0,jsx_runtime.jsxs)(HeaderSide,{ref:rightSideRef,align:"right",children:[(0,jsx_runtime.jsx)(MobileOnly,{children:(0,jsx_runtime.jsx)(HeaderIconButton,{type:"button",theme,"aria-expanded":optionsOpen,"aria-label":"Open site options",onClick:()=>optionsOpen?setOptionsOpen(!1):(setNavOpen(!1),void setOptionsOpen(!0)),children:(0,jsx_runtime.jsx)(CogGlyph,{})})}),(0,jsx_runtime.jsx)(DesktopOnly,{children:(0,jsx_runtime.jsxs)(LanguageThemeContainer,{children:[(0,jsx_runtime.jsx)(Language,{theme}),(0,jsx_runtime.jsx)(Components_ThemeToggle,{handleClick:toggleTheme,theme})]})})]})]}),mobileNavPortal,optionsPortal]})},Components_Header=Header_Header;Header_Header.__docgenInfo={description:"",methods:[],displayName:"Header"};const StoryShell=_ref=>{let{Story}=_ref;const{theme}=useTheme(),colors=getColors(theme);return(0,jsx_runtime.jsxs)("div",{style:{minHeight:"140vh",position:"relative",overflow:"hidden",background:colors.background},children:[(0,jsx_runtime.jsx)("div",{style:{position:"absolute",inset:0,zIndex:0,pointerEvents:"none"},children:(0,jsx_runtime.jsx)(paper_texture.Hx,{colorBack:colors.background,colorFront:colors.backgroundAccent,contrast:.12,roughness:1,fiber:.05,fiberSize:.01,crumples:0,crumpleSize:.01,folds:0,foldCount:1,drops:0,fade:0,seed:0,scale:.5,fit:"cover"})}),(0,jsx_runtime.jsx)("div",{style:{position:"relative",zIndex:1},children:(0,jsx_runtime.jsx)(Story,{})})]})},Header_stories={title:"Components/Header",component:Components_Header,parameters:{layout:"fullscreen",viewport:{viewports:{mobileSm:{name:"Mobile 360",styles:{width:"360px",height:"800px"}},tablet:{name:"Tablet 768",styles:{width:"768px",height:"1024px"}},desktop:{name:"Desktop 1280",styles:{width:"1280px",height:"900px"}}}}},decorators:[Story=>(0,jsx_runtime.jsx)(chunk_EVOBXE3Y.VA,{initialEntries:["/home"],children:(0,jsx_runtime.jsx)(ThemeProvider,{children:(0,jsx_runtime.jsx)(StoryShell,{Story})})})]},Default={},Mobile={parameters:{viewport:{defaultViewport:"mobileSm"}}},Tablet={parameters:{viewport:{defaultViewport:"tablet"}}},Desktop={parameters:{viewport:{defaultViewport:"desktop"}}},__namedExportsOrder=["Default","Mobile","Tablet","Desktop"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"{}",...Default.parameters?.docs?.source}}},Mobile.parameters={...Mobile.parameters,docs:{...Mobile.parameters?.docs,source:{originalSource:'{\n  parameters: {\n    viewport: {\n      defaultViewport: "mobileSm"\n    }\n  }\n}',...Mobile.parameters?.docs?.source}}},Tablet.parameters={...Tablet.parameters,docs:{...Tablet.parameters?.docs,source:{originalSource:'{\n  parameters: {\n    viewport: {\n      defaultViewport: "tablet"\n    }\n  }\n}',...Tablet.parameters?.docs?.source}}},Desktop.parameters={...Desktop.parameters,docs:{...Desktop.parameters?.docs,source:{originalSource:'{\n  parameters: {\n    viewport: {\n      defaultViewport: "desktop"\n    }\n  }\n}',...Desktop.parameters?.docs?.source}}}},"./src/Components/ServicesNoren/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>ServicesNoren});var react=__webpack_require__("./node_modules/react/index.js"),styled_components_browser_esm=__webpack_require__("./node_modules/styled-components/dist/styled-components.browser.esm.js"),DesignSystem=__webpack_require__("./src/DesignSystem/index.ts");const norenBreeze=styled_components_browser_esm.F4`
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
//# sourceMappingURL=Components-Header-Header-stories.5f4d0468.iframe.bundle.js.map