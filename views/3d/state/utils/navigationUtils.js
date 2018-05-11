// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","../../lib/glMatrix","./primitiveIntersectionUtils","../../support/mathUtils"],function(e,t,r,c,a){function n(e,t,r){return r[0]=t[0]/e.fullWidth,r[1]=t[1]/e.fullHeight,r}function d(e,t,r,a,n){void 0===n&&(n=!1);var d=w;return c.createRay(t,r,d,n),!!c.intersectSphere(e,d,a)||(p(e,d,a),!1)}function i(e,t,r,a){var n=w;return c.createRay(t,r,n,!0),c.intersectSphere(e,n,a)}function o(e,t,c){r.vec3d.cross(e,t,c);var n=r.vec3d.dot(e,t)/(r.vec3d.length(e)*r.vec3d.length(t));return-a.acos(n)}function v(e,t,c){var a=O,n=R,d=T;r.vec3d.set(e,n),r.vec3d.set(t,d);var i=r.vec3d.dot(n,c),o=r.vec3d.dot(d,c);r.vec3d.scale(c,i,a),r.vec3d.subtract(n,a),r.vec3d.normalize(n),r.vec3d.scale(c,o,a),r.vec3d.subtract(d,a),r.vec3d.normalize(d);var v=r.vec3d.dot(n,d);r.vec3d.cross(c,n,a);var l=r.vec3d.dot(d,a);return Math.atan2(l,v)}function l(e,t,c){r.vec3d.set(t,c.normal),c.d=-r.vec3d.dot(t,e)}function s(e,t){t.d=-r.vec3d.dot(t.normal,e)}function u(e){for(;e>Math.PI;)e-=2*Math.PI;for(;e<-Math.PI;)e+=2*Math.PI;return e}function h(e,t,c,a){var n=D;r.mat4d.identity(n),r.mat4d.rotate(n,a,c),r.vec3d.subtract(e.eye,t),r.mat4d.multiplyVec3(n,e.eye,e.eye),r.vec3d.add(e.eye,t),r.vec3d.subtract(e.center,t),r.mat4d.multiplyVec3(n,e.center,e.center),r.vec3d.add(e.center,t),r.mat4d.multiplyVec3(n,e.up,e.up),e.markViewDirty()}function p(e,t,c){var n=O,d=R,i=H;r.vec3d.subtract(t.origin,e.center,d),r.vec3d.cross(d,t.direction,n),r.vec3d.cross(n,d,c),r.vec3d.scale(c,1/r.vec3d.length(c)*e.radius);var o=-a.asin(e.radius/r.vec3d.length(t.origin));r.mat4d.identity(i),r.mat4d.rotate(i,o,n),r.mat4d.multiplyVec3(i,c)}function m(e,t,r,a){var n=w;return c.createRay(t,r,n),c.intersectPlane(e,n,a)}function P(e,t,c,a){var n=F,d=1-c;r.vec3d.subtract(t,e.eye,n);var i=r.vec3d.length(n),o=i*(1-d);d>=0&&o<a&&(o=a,d=-(o-i)/i),Math.abs(i-o)<1e-6||(r.vec3d.scale(n,d),r.vec3d.add(e.eye,n),r.vec3d.lerp(e.center,t,d))}function f(e,t,c){r.vec2d.set2(t.padding[3]+t.width/2,t.padding[2]+t.height/2,I),i(e,t,I,t.center),r.vec3d.subtract(t.center,t.eye,F);var a=r.vec3d.length(F),n=a*c;Math.abs(a-n)<1e-6||(r.vec3d.scale(F,c),r.vec3d.subtract(t.center,F,t.eye),t.markViewDirty())}function y(e,t,c){r.vec2d.set2(t.x,e.fullHeight-t.y,c)}function g(e,t,c){b(t,c),r.vec3d.normalize(c),r.vec3d.scale(c,e)}function b(e,t){r.vec3d.set3(0,0,0,t);for(var c=0,a=e;c<a.length;c++){var n=a[c];r.vec3d.add(t,n)}r.vec3d.scale(t,1/e.length)}function M(e,c,a,n){var o=r.vec3d.create(),v={center:r.vec3d.create(),radius:0},l=!0;return e.pickPointInScreen(a,o)?v.radius=r.vec3d.length(o):(v.radius=r.vec3d.length(c.center),v.radius<.9*t.Earth.radius&&(v.radius=t.Earth.radius),v.radius=Math.max(r.vec3d.length(c.center),.9*t.Earth.radius),n?d(v,c,a,o):l=i(v,c,a,o)),{sphere:v,scenePickPoint:l?o:null}}function S(e,c,a){if(r.vec3d.length(e.eye)-t.Earth.radius<t.VerticalPanTresholds.Elevation)return c.radius>r.vec3d.length(e.eye)?A.Vertical:(r.vec3d.normalize(r.vec3d.subtract(e.eye,a,E)),Math.abs(.5*Math.PI-Math.acos(r.vec3d.dot(a,E)/r.vec3d.length(a)))<t.VerticalPanTresholds.Angle?A.Vertical:A.Horizontal);return A.Horizontal}function V(e,t,c){r.vec3d.subtract(c,t,k),r.vec3d.subtract(e.eye,k),r.vec3d.subtract(e.center,k),e.markViewDirty()}function z(e,t,r,c){var a=o(r,c,x);h(t,e.center,x,a)}Object.defineProperty(t,"__esModule",{value:!0}),t.Earth={center:r.vec3d.create(),radius:6378137},t.normalizeCoordinate=n,t.sphereOrSilhouettePointFromScreenPoint=d,t.intersectSphereFromScreenPoint=i,t.rotationAndAxisFromPoints=o,t.rotationFromPointsAroundAxis=v,t.setPlane=l,t.setPlaneD=s,t.normalizeRotationDelta=u,t.applyRotation=h,t.closestPointOnSphereSilhouette=p,t.intersectPlaneFromScreenPoint=m,t.applyZoomToPoint=P,t.applyZoomOnSphere=f;var I=r.vec2d.create();t.navPointToScreenPoint=y,t.centroidOnSphere=g,t.centroid=b;var A;!function(e){e[e.Vertical=0]="Vertical",e[e.Horizontal=1]="Horizontal"}(A=t.PanMode||(t.PanMode={})),t.VerticalPanTresholds={Elevation:3e4,Angle:8/180*Math.PI},t.pickPointAndInitSphere=M,t.decidePanMode=S;var E=r.vec3d.create();t.applyPanPlanar=V;var k=r.vec3d.create();t.applyPanSpherical=z;var x=r.vec3d.create(),H=r.mat4d.create(),D=r.mat4d.create(),F=r.vec3d.create(),O=r.vec3d.create(),R=r.vec3d.create(),T=r.vec3d.create(),w={origin:r.vec3d.create(),direction:r.vec3d.create()}});