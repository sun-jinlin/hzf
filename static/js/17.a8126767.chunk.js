(this.webpackJsonphzf=this.webpackJsonphzf||[]).push([[17],{472:function(t,e,n){t.exports={root:"Search_root__3XRka",list:"Search_list__2ZzXN",noHistory:"Search_noHistory__3-Vqk",tips:"Search_tips__3v9aU",tip:"Search_tip__2W4Q4"}},497:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return b}));n(117);var a=n(92),r=n.n(a),c=n(28),i=n.n(c),s=n(38),o=n(34),u=n(35),h=n(36),p=n(37),l=n(0),m=n(472),d=n.n(m),f=n(39),v=n(15);function j(t,e){return Object(v.b)({method:"get",url:"/area/community",params:{id:t,name:e}})}var y=n(1),b=function(t){Object(h.a)(n,t);var e=Object(p.a)(n);function n(){var t;Object(o.a)(this,n);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(t=e.call.apply(e,[this].concat(r))).state={searchTxt:"",tipsList:[]},t.handlerChange=function(e){var n=e.trim(),a=t.state.searchTxt;n!==a&&t.setState({searchTxt:n},(function(){clearTimeout(t.timer),t.timer=setTimeout(Object(s.a)(i.a.mark((function e(){var a,r,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j(t.cityId,n);case 2:a=e.sent,r=a.status,c=a.data,200===r&&t.setState({tipsList:c});case 6:case"end":return e.stop()}}),e)}))),600)}))},t.handlerClick=function(e){t.props.history.replace({pathname:"/rent/add",data:{id:e.community,name:e.communityName}})},t.renderTips=function(){return t.state.tipsList.map((function(e){return Object(y.jsx)("li",{onClick:function(){t.handlerClick(e)},className:d.a.tip,children:e.communityName},e.community)}))},t}return Object(u.a)(n,[{key:"componentDidMount",value:function(){var t=Object(s.a)(i.a.mark((function t(){var e,n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(f.a)();case 2:e=t.sent,n=e.value,this.cityId=n;case 5:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){var t=this.props.history,e=this.state.searchTxt;return Object(y.jsxs)("div",{className:d.a.root,children:[Object(y.jsx)(r.a,{placeholder:"\u8bf7\u8f93\u5165\u5c0f\u533a\u6216\u5730\u5740",onChange:this.handlerChange,value:e,showCancelButton:!0,onCancel:function(){return t.replace("/rent/add")}}),Object(y.jsx)("ul",{className:d.a.tips,children:this.renderTips()})]})}}]),n}(l.Component)}}]);
//# sourceMappingURL=17.a8126767.chunk.js.map