if(document.execCommand&&document.all&&!window.opera){document.execCommand("BackgroundImageCache",false,true)}var d=document;var mObj,cssObj;var isActive=false;var activeObj=null;var pause=false;var treeIndex=0;var clonedObj=null;var mDown=false;var offsetX,offsetY;if(d.all&&!window.opera){var statusImg=new Array("gray.png","")}else{var statusImg=new Array("gray.png","outline.png","")}var keyboardObjIndex=0;var modiHiddenObjects=new Array();var modiFocused=false;if(d.contentType){var isAppXML=document.contentType.indexOf("application/xhtml")>-1}else{var isAppXML=false}var pref_showAttr=true;var pref_showDim=true;var pref_showParents=true;var pref_highlights=0;var pref_freeze=true;var pref_backgroundHighlightColor="#C0C0C0";var pref_childHighlightColor="#FAFAFA";var pref_outlineColor="#FF0000";var pref_outlineWidth="2px";var pref_visible=true;var pref_alwaysTransparent=false;var pref_alwaysTransparentValue=60;var pref_allDataListsCollapsed=false;var pref_showChildren=true;var oHighlightColor=pref_backgroundHighlightColor;var so_host="http://slayeroffice.com/tools/modi/v2.0/";var so_lbl=new Array();function getStyle(f,e){if(f.currentStyle){var h=f.currentStyle[e]}else{if(window.getComputedStyle){var h=document.defaultView.getComputedStyle(f,null).getPropertyValue(e)}}return h}function so_init(){try{if(prefFile!=""){nPrefs=d.getElementsByTagName("head")[0].appendChild(d.createElement("script"));nPrefs.type="text/javascript";nPrefs.src=prefFile;oHighlightColor=pref_backgroundHighlightColor}}catch(e){}d.onmousemove=so_captureMouseMoveEvent;d.onkeydown=so_captureKeyDownEvent;window.onscroll=so_keepModiInView;so_prepInputs();all=d.getElementsByTagName("*");for(i=0;i<all.length;i++){if(all[i].tagName!="HTML"&&all[i].tagName!="BODY"&&all[i].tagName!="!"){so_prepareObjForMODI(all[i])}}cssObj=d.getElementsByTagName("head")[0].appendChild(d.createElement("link"));cssObj.type="text/css";cssObj.rel="Stylesheet";cssObj.href=so_host+"modi_v2.0.css";cssObj.id="modiCSS";cssObj.xid="modi";mObj=d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));mObj.id="modiContainer";mObj.xid="modi";mObj.style.visibility=pref_visible?"visible":"hidden";mObj.onmouseover=function(){modiFocused=true;so_setOpacity(mObj,99)};mObj.onmouseout=function(){modiFocused=false};h2=mObj.appendChild(d.createElement("h2"));h2.appendChild(d.createTextNode("Mouse-over any element to begin."));h2.id="tmp_h2"}function so_prepInputs(){txtInput=d.getElementsByTagName("input");txtArea=d.getElementsByTagName("textarea");for(i=0;i<txtInput.length;i++){if(txtInput[i].getAttribute("type")=="text"||txtInput[i].getAttribute("type")==""){txtInput[i].onfocus=function(){if(pause){return}pause=true;if(d.getElementById("so_h2").innerHTML.indexOf("paused")==-1){d.getElementById("so_h2").appendChild(d.createTextNode(" [paused for input focus]"))}};txtInput[i].onblur=function(){pause=false}}}for(i=0;i<txtArea.length;i++){txtArea[i].onfocus=function(){if(pause){return}pause=true;if(d.getElementById("so_h2").innerHTML.indexOf("paused")==-1){d.getElementById("so_h2").appendChild(d.createTextNode(" [paused for input focus]"))}};txtArea[i].onblur=function(){pause=false}}}function so_keepModiInView(){winHeight=d.all&&!window.opera?document.documentElement.clientHeight:window.innerHeight;if(mObj.offsetHeight>winHeight){return}if(mObj.offsetTop<_returnScrollDimensions(1)){mObj.style.top=_returnScrollDimensions(1)+"px"}if(mObj.offsetTop+mObj.offsetHeight>winHeight+_returnScrollDimensions(1)){mObj.style.top=(_returnScrollDimensions(1)+winHeight)-mObj.offsetHeight+"px"}}function so_captureMouseMoveEvent(f){x=d.all?window.event.clientX:f.clientX;y=d.all?window.event.clientY:f.pageY;if(pause||pref_freeze){if(mDown){x-=offsetX;y-=offsetY;if(mDown){mObj.style.top=y+"px";mObj.style.left=x+"px"}return}}if(activeObj==null&&!modiFocused){so_setOpacity(mObj,40)}else{so_setOpacity(mObj,99)}if(pref_freeze){so_keepModiInView();return}if(d.all&&!window.opera){x+=_returnScrollDimensions(0);y+=_returnScrollDimensions(1)}if(x+mObj.offsetWidth>d.getElementsByTagName("body")[0].offsetWidth){mObj.style.left=(x-mObj.offsetWidth)+"px"}else{mObj.style.left=(x+15)+"px"}if(mObj.offsetLeft<0){mObj.style.left="0px"}yOffset=_returnScrollDimensions(1);if(y-mObj.offsetHeight<=0||(y-mObj.offsetHeight)<yOffset){mObj.style.top=(y+15)+"px"}else{mObj.style.top=(y-mObj.offsetHeight)+"px"}}function _returnScrollDimensions(e){if(e){if(d.body.scrollTop!=0){return d.body.scrollTop}if(d.documentElement.scrollTop!=0){return d.documentElement.scrollTop}}else{if(d.body.scrollLeft!=0){return d.body.scrollTop}if(d.documentElement.scrollLeft!=0){return d.documentElement.scrollLeft}}return 0}function so_setObjHighlight(e){switch(pref_highlights){case 0:e.style.backgroundColor=pref_backgroundHighlightColor;break;case 1:outline=pref_outlineWidth+" solid "+pref_outlineColor;e.style.MozOutline=outline;e.style.outline=outline;break;case 2:return;break}}function so_unsetObjHighlight(e){if(!e){return}switch(pref_highlights){case 0:if(e.randomBGColor==null){e.style.backgroundColor=e.so_prevBGColor}else{e.style.backgroundColor=e.randomBGColor}break;case 1:e.style.MozOutline="none";e.style.outline="none";break;case 2:return;break}}function so_captureKeyDownEvent(f){keyCode=d.all?window.event.keyCode:f.keyCode;if(d.getElementById("htmlView")){switch(keyCode){case 27:so_closeEditWindow();break;case 13:so_applyInnerHTML(d.getElementById("htmlViewText").value,activeObj);break}return}if(pause){if(keyCode==80){pause=false;return}}switch(keyCode){case 27:so_cleanUp();break;case 49:so_snapWindow(0);break;case 50:break;case 65:so_cloneObject();break;case 66:if(pause){return}so_unsetObjHighlight(activeObj);pref_highlights++;if(d.all&&!window.opera){maxValue=1}else{maxValue=2}if(pref_highlights>maxValue){pref_highlights=0}if(activeObj){so_setObjHighlight(activeObj)}d.getElementById("so_h2").style.backgroundImage="url("+so_host+""+statusImg[pref_highlights]+")";break;case 67:so_randomColor();break;case 68:if(pause){return}pref_visible=pref_visible?false:true;mObj.style.visibility=pref_visible?"visible":"hidden";break;case 69:so_removeWidth();break;case 70:if(pause){return}pref_freeze=pref_freeze?false:true;if(!pref_freeze){mDown=false}break;case 71:so_changeListState();break;case 72:so_hideObject();break;case 74:so_showModiHiddenObjects();break;case 75:so_removeLables();break;case 76:so_labelObj(activeObj);break;case 78:so_showFirstChild();break;case 79:if(activeObj){so_outlineObj(activeObj)}break;case 80:if(!activeObj){return}pause=pause?false:true;if(pause){d.getElementById("so_h2").appendChild(d.createTextNode(" [paused]"))}so_setOpacity(mObj,99);break;case 82:so_removeObj();break;case 83:so_insertClonedObj();break;case 84:if(d.getElementsByTagName("*")[treeIndex].xid=="modi"){do{treeIndex++;if(treeIndex>=d.getElementsByTagName("*").length){treeIndex=0}}while(d.getElementsByTagName("*")[treeIndex].xid=="modi")}so_walkDOMTree();treeIndex++;break;case 85:pref_alwaysTransparent=pref_alwaysTransparent?false:true;so_setOpacity(mObj,pref_alwaysTransparent?60:99);break;case 86:so_createEditWindow(activeObj);break;case 87:so_showParentObj();break;case 89:if(d.getElementsByTagName("*")[treeIndex].xid=="modi"){do{treeIndex--;if(treeIndex<0){treeIndex=d.getElementsByTagName("*").length-1}}while(d.getElementsByTagName("*")[treeIndex].xid=="modi")}so_walkDOMTree();treeIndex--;break}}function so_snapWindow(e){if(!pref_freeze){pref_freeze=true}switch(e){case 0:y=_returnScrollDimensions(1);mObj.style.left="10px";mObj.style.top=y+"px";break;case 1:break}}function so_changeListState(){if(!pref_allDataListsCollapsed){d.getElementById("attributeData").style.display="none";d.getElementById("parentData").style.display="none";d.getElementById("dimensionData").style.display="none";d.getElementById("childData").style.display="none";pref_showAttr=false;pref_showDim=false;pref_showParents=false;pref_showChildren=false;pref_allDataListsCollapsed=true}else{d.getElementById("attributeData").style.display="block";d.getElementById("parentData").style.display="block";d.getElementById("dimensionData").style.display="block";d.getElementById("childData").style.display="block";pref_showAttr=true;pref_showDim=true;pref_showParents=true;pref_showChildren=true;pref_allDataListsCollapsed=false}}function so_removeLables(){for(i=0;i<so_lbl.length;i++){try{d.getElementsByTagName("body")[0].removeChild(so_lbl[i])}catch(e){}}so_lbl=new Array()}function so_createEditWindow(e){if(!activeObj){return}if(pause){return}pause=true;if(d.all&&!window.opera){if(mObj.offsetWidth<315){mObj.style.width="318px"}if(mObj.offsetHeight<215){mObj.style.height="218px"}}editWindow=mObj.appendChild(d.createElement("div"));editWindow.id="htmlView";h3=editWindow.appendChild(d.createElement("h3"));h3.appendChild(d.createTextNode("HTML Source for "+e.tagName.toLowerCase()));txt=editWindow.appendChild(d.createElement("textarea"));txt.setAttribute("id","htmlViewText");txt.value=e.innerHTML;editWindow.appendChild(d.createElement("br"));a=editWindow.appendChild(d.createElement("a"));a.onclick=so_closeEditWindow;a.className="btn";if(!isAppXML){a.appendChild(d.createTextNode("Cancel"))}else{a.appendChild(d.createTextNode("Close"))}if(!isAppXML){a=editWindow.appendChild(d.createElement("a"));a.onclick=function(){so_applyInnerHTML(d.getElementById("htmlViewText").value,e)};a.className="btn";a.appendChild(d.createTextNode("Apply"))}}function so_applyInnerHTML(e,h){if(isAppXML){so_closeEditWindow();return}try{h.innerHTML=e;so_closeEditWindow();all=h.getElementsByTagName("*");for(i=0;i<all.length;i++){so_prepareObjForMODI(all[i])}}catch(f){alert("An error occured while applying the innerHTML of this object. The most likely culprit is that this site is serving its content as application/xhtml+xml.\nError text was:\n\n"+f.message);so_closeEditWindow()}}function so_prepareObjForMODI(e){e.addEventListener?e.addEventListener("mouseover",so_showObjInfo,false):e.onmouseover=so_showObjInfo;e.addEventListener?e.addEventListener("mouseout",so_hideObjInfo,false):e.onmouseout=so_hideObjInfo;e.so_prevBGColor=all[i].style.backgroundColor;e.so_prevWidth=all[i].offsetWidth;e.so_prevTitle=all[i].getAttribute("title")}function so_closeEditWindow(){document.getElementById("modiContainer").removeChild(document.getElementById("htmlView"));so_unsetObjHighlight(activeObj);activeObj=null;pause=false}function so_outlineObj(e){if(pause){return}outline=pref_outlineWidth+" solid "+pref_outlineColor;e.style.MozOutline=outline;e.style.outline=outline}function so_setOpacity(e,f){if(pref_alwaysTransparent){f=pref_alwaysTransparentValue}if(!d.all){f/=100}e.style.opacity=f;e.style.MozOpacity=f;e.style.filter="alpha(opacity="+f+")"}function so_showObjInfo(){if(pause){return}if(isActive){return}activeObj=this;isActive=true;so_buildDataDisplay(this);so_setOpacity(mObj,99);so_setObjHighlight(this)}function so_hideObjInfo(){if(pause){return}try{so_unsetObjHighlight(this)}catch(e){}isActive=false;activeObj=null}function so_buildDataDisplay(f){if(pause){return}if(d.getElementById("tmp_h2")){mObj.removeChild(d.getElementById("tmp_h2"))}if(d.getElementById("sContainer")){mObj.removeChild(d.getElementById("sContainer"))}if(!pref_visible){ttl=f.tagName.toLowerCase();if(f.id){ttl+=' id="'+f.id+'"'}if(f.className){ttl+=' class="'+f.className+'"'}f.setAttribute("title",ttl);return}sObj=mObj.appendChild(d.createElement("div"));sObj.setAttribute("id","sContainer");h2=sObj.appendChild(d.createElement("h2"));h2.appendChild(d.createTextNode(f.tagName.toLowerCase()));if(pause){h2.appendChild(d.createTextNode(" [paused]"))}h2.onmousedown=so_captureOffset;h2.onmouseup=function(){mDown=false};h2.id="so_h2";h2.style.backgroundImage="url("+so_host+""+statusImg[pref_highlights]+")";h3=sObj.appendChild(d.createElement("h3"));h3.appendChild(d.createTextNode("attributes"));h3.className=pref_showAttr?"h3_on":"h3_off";h3.onclick=function(){pref_showAttr=pref_showAttr?false:true;this.className=pref_showAttr?"h3_on":"h3_off";document.getElementById("attributeData").style.display=pref_showAttr?"block":"none"};ul=sObj.appendChild(d.createElement("ul"));ul.setAttribute("id","attributeData");ul.style.display=pref_showAttr?"block":"none";attrCount=0;for(i=0;i<f.attributes.length;i++){if(f.attributes[i].specified){if(f.attributes[i].value&&f.attributes[i].name.indexOf("so_")==-1){attrCount++;li=ul.appendChild(d.createElement("li"));val=e(f.attributes[i].value);li.appendChild(d.createTextNode(f.attributes[i].name.toLowerCase()+" : "+val))}}}if(attrCount==0){li=ul.appendChild(d.createElement("li"));li.appendChild(d.createTextNode("None Specified."))}h3=sObj.appendChild(d.createElement("h3"));h3.appendChild(d.createTextNode("dimensions"));h3.className=pref_showDim?"h3_on":"h3_off";h3.onclick=function(){pref_showDim=pref_showDim?false:true;this.className=pref_showDim?"h3_on":"h3_off";document.getElementById("dimensionData").style.display=pref_showDim?"block":"none"};ul=sObj.appendChild(d.createElement("ul"));ul.setAttribute("id","dimensionData");ul.style.display=pref_showDim?"block":"none";li=ul.appendChild(d.createElement("li"));li.appendChild(d.createTextNode("Font Size : "+getStyle(f,"font-size")));li=ul.appendChild(d.createElement("li"));li.appendChild(d.createTextNode("Width : "+f.offsetWidth+"px"));li=ul.appendChild(d.createElement("li"));li.appendChild(d.createTextNode("Height : "+f.offsetHeight+"px"));li=ul.appendChild(d.createElement("li"));li.appendChild(d.createTextNode("Top : "+so_findPosition(f,0)+"px"));li=ul.appendChild(d.createElement("li"));li.appendChild(d.createTextNode("Left : "+so_findPosition(f,1)+"px"));h3=sObj.appendChild(d.createElement("h3"));h3.appendChild(d.createTextNode("parent structure"));h3.className=pref_showParents?"h3_on":"h3_off";h3.onclick=function(){pref_showParents=pref_showParents?false:true;this.className=pref_showParents?"h3_on":"h3_off";document.getElementById("parentData").style.display=pref_showParents?"block":"none"};so_getParents(f,sObj);if(f.childNodes.length){h3=sObj.appendChild(d.createElement("h3"));h3.appendChild(d.createTextNode("children"));h3.className=pref_showChildren?"h3_on":"h3_off";h3.onclick=function(){pref_showChildren=pref_showChildren?false:true;this.className=pref_showChildren?"h3_on":"h3_off";document.getElementById("childData").style.display=pref_showChildren?"block":"none"};ul=sObj.appendChild(d.createElement("ul"));ul.setAttribute("id","childData");ul.style.display=pref_showChildren?"block":"none";for(i=0;i<f.childNodes.length;i++){li=ul.appendChild(d.createElement("li"));if(f.childNodes[i].nodeType==1){li.appendChild(d.createTextNode(f.childNodes[i].nodeName.toLowerCase()));li.className="parentStructure";li.myObj=f.childNodes[i];li.onmouseover=function(){pref_backgroundHighlightColor=pref_childHighlightColor;this.myObj.so_prevBGColor=this.myObj.style.backgroundColor;so_setObjHighlight(this.myObj)};li.onmouseout=function(){pref_backgroundHighlightColor=oHighlightColor;so_unsetObjHighlight(this.myObj)};if(f.childNodes[i].getAttribute("id")){li.appendChild(d.createTextNode(' id="'+f.childNodes[i].getAttribute("id")+'"'))}if(f.childNodes[i].className){li.appendChild(d.createTextNode(' class="'+f.childNodes[i].className+'"'))}}else{nodes=new Array("","Element Node","Attribute Node","#text","CDATA Node","Entity Reference Node","Entity Node","Processing Instruction Node","Comment Node","Document Node","Document Fragment Node","Notation Node");li.appendChild(d.createTextNode(nodes[f.childNodes[i].nodeType]));li.setAttribute("title",f.childNodes[i].nodeValue)}}}div=sObj.appendChild(d.createElement("div"));div.setAttribute("id","credits");b=div.appendChild(d.createElement("b"));a=d.createElement("a");a.setAttribute("href","javascript:so_cleanUp();");a.appendChild(d.createTextNode("[esc] to quit"));b.appendChild(a);b.appendChild(d.createTextNode(" | "));a=b.appendChild(d.createElement("a"));a.setAttribute("title","Help!");a.setAttribute("href",so_host+"modi_help.html");a.setAttribute("target","_blank");a.appendChild(d.createTextNode("help documentation"));div.appendChild(d.createElement("br"));div.appendChild(d.createTextNode("Mouseover DOM Inspector"));div.appendChild(d.createElement("br"));div.appendChild(d.createTextNode("version 2.0.2 (05.11.2005)"));div.appendChild(d.createElement("br"));div.appendChild(d.createTextNode("slayeroffice.com"));div.appendChild(d.createElement("br"));so_tagAsMODI();if(d.all&&!window.opera){if(mObj.offsetWidth>400){mObj.style.width="400px"}}function e(h){if(d.all&&!window.opera){return h}if(h.indexOf(" ")>-1){return h}for(ee=0;ee<h.length;ee++){if(ee%50==0){h=h.substring(0,ee)+" "+h.substring(ee,h.length)}}return h}}function so_getParents(e,f){parents=new Array();parentObjRef=new Array();while(e.parentNode){parents[parents.length]=e.tagName.toLowerCase();parentObjRef[parentObjRef.length]=e;e=e.parentNode}ul=f.appendChild(d.createElement("ul"));ul.setAttribute("id","parentData");ul.style.display=pref_showParents?"block":"none";for(i=parents.length-1;i>0;i--){li=ul.appendChild(d.createElement("li"));li.appendChild(d.createTextNode(parents[i]));if(parentObjRef[i].getAttribute("id")){li.appendChild(d.createTextNode(' id="'+parentObjRef[i].getAttribute("id")+'"'))}if(parentObjRef[i].className){li.appendChild(d.createTextNode(' class="'+parentObjRef[i].className+'"'))}li.myObj=parentObjRef[i];li.className="parentStructure";li.onmouseover=function(){this.myObj.so_prevBGColor=this.myObj.style.backgroundColor;so_setObjHighlight(this.myObj)};li.onmouseout=function(){so_unsetObjHighlight(this.myObj)}}}function so_showParentObj(){if(pause){return}so_unsetObjHighlight(activeObj);if(activeObj.parentNode&&activeObj.tagName!="HTML"){activeObj=activeObj.parentNode;activeObj.so_prevBGColor=activeObj.style.backgroundColor;so_setObjHighlight(activeObj);so_buildDataDisplay(activeObj)}}function so_labelObj(e){if(pause||!activeObj){return}lblText=e.tagName.toLowerCase();len=so_lbl.length;so_lbl[len]=d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));so_lbl[len].appendChild(d.createTextNode(lblText));so_lbl[len].className="modi_label";so_lbl[len].style.top=so_findPosition(e,0)+"px";so_lbl[len].style.left=so_findPosition(e,1)+"px";so_lbl[len].onclick=function(){this.parentNode.removeChild(this)}}function so_removeObj(){if(pause){return}activeObj.parentNode.removeChild(activeObj)}function so_cleanUp(){d.getElementsByTagName("head")[0].removeChild(d.getElementById("modiCSS"));d.getElementsByTagName("body")[0].removeChild(d.getElementById("modiContainer"));if(d.getElementById("modi")){d.getElementsByTagName("body")[0].removeChild(d.getElementById("modi"))}else{d.getElementsByTagName("body")[0].removeChild(d.getElementById("sss"))}d.onkeydown=null;d.onmousemove=null;all=d.getElementsByTagName("*");for(i=0;i<all.length;i++){all[i].removeEventListener?all[i].removeEventListener("mouseover",so_showObjInfo,false):all[i].onmouseover=null;all[i].removeEventListener?all[i].removeEventListener("mouseout",so_hideObjInfo,false):all[i].onmouseout=null;all[i].style.backgroundColor=all[i].so_prevBGColor;all[i].so_prevBGColor=null;if(all[i].randomBGColor){all[i].randomBGColor=null}all[i].setAttribute("title",all[i].so_prevTitle);all[i].style.outline="none";all[i].style.MozOutline="none"}if(activeObj){activeObj.style.backgroundColor=activeObj.so_prevBGColor}}function so_randomColor(){if(pause){return}if(activeObj==null){return}if(!activeObj.randomBGColor){r=Math.floor(Math.random()*256);g=Math.floor(Math.random()*256);b=Math.floor(Math.random()*256);rgb="rgb("+r+","+g+","+b+")";if(activeObj){activeObj.style.backgroundColor=rgb;activeObj.randomBGColor=rgb}}else{if(activeObj.style.backgroundColor==activeObj.so_prevBGColor){activeObj.style.backgroundColor=activeObj.randomBGColor}else{activeObj.style.backgroundColor=activeObj.so_prevBGColor;activeObj.randomBGColor=activeObj.so_prevBGColor}}}function so_walkDOMTree(){if(pause){return}if(activeObj){so_unsetObjHighlight(activeObj)}if(treeIndex>=d.getElementsByTagName("*").length){treeIndex=0}if(treeIndex<0){treeIndex=d.getElementsByTagName("*").length-1}activeObj=d.getElementsByTagName("*")[treeIndex];if(d.all&&!window.opera){if(activeObj.tagName=="!"){treeIndex++;activeObj=d.getElementsByTagName("*")[treeIndex]}}so_buildDataDisplay(activeObj);so_setObjHighlight(activeObj);if(!pref_freeze){mObj.style.top=so_findPosition(activeObj,0)+15+"px";mObj.style.left=so_findPosition(activeObj,1)+15+"px"}}function so_tagAsMODI(){modiChildren=mObj.getElementsByTagName("*");for(m=0;m<modiChildren.length;m++){modiChildren[m].xid="modi"}}function so_findPosition(f,e){cur=0;if(f.offsetParent){while(f.offsetParent){cur+=e?f.offsetLeft:f.offsetTop;f=f.offsetParent}}return cur}function so_cloneObject(){if(pause){return}if(!activeObj){return}clonedObj=activeObj.cloneNode(true)}function so_insertClonedObj(){if(pause){return}if(!activeObj||!clonedObj){return}activeObj.appendChild(clonedObj);so_prepareObjForMODI(clonedObj);c=clonedObj.getElementsByTagName("*");for(i=0;i<c.length;i++){so_prepareObjForMODI(c[i])}}function so_captureOffset(f){mDown=true;nx=parseInt(mObj.offsetLeft);ny=parseInt(mObj.offsetTop);if(d.all){offsetX=window.event.clientX-nx;offsetY=window.event.clientY-ny}else{offsetX=f.pageX-nx;offsetY=f.pageY-ny}}function so_hideObject(){if(pause||!activeObj){return}if(activeObj.style.visibility==""||activeObj.style.visibility=="visible"){modiHiddenObjects[modiHiddenObjects.length]=activeObj;activeObj.style.visibility="hidden";activeObj=null}}function so_showModiHiddenObjects(){if(pause){return}for(w=0;w<modiHiddenObjects.length;w++){modiHiddenObjects[w].style.visibility="visible"}modiHiddenObjects=new Array()}function so_removeWidth(){if(pause){return}if(!activeObj){return}if(activeObj.so_prevWidth!=activeObj.offsetWidth){activeObj.style.width=activeObj.so_prevWidth+"px";activeObj.so_prevWidth=activeObj.offsetWidth}else{activeObj.style.width="auto"}}function so_showFirstChild(){if(pause){return}if(!activeObj){return}n=activeObj.childNodes;if(!n.length){return}m=null;for(k=0;k<n.length;k++){if(n[k].nodeType==1){m=n[k];break}}if(!m){return}so_unsetObjHighlight(activeObj);activeObj=m;so_buildDataDisplay(activeObj)}so_init();