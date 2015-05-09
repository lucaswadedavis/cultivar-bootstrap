(function() {

  var root = this;
  var dev = true;
  var app = {};
  var template = {};

  ////////////////////////////////////////////////////////////

  var utils = {};
  
  utils.pipe = function(){
    var finalValue = arguments[0];
    for (var i=1;i<arguments.length;i++){
      finalValue = arguments[i](finalValue);
    }
    return finalValue;
  };
  
  ////////////////////////////////////////////////////////////

  var content = {};
  
  content.titles = [
    {type:"title", text:"Lucas Wade Davis"}
    ];
  content.images = [
    {type:"image", text:"me", image:"./images/headshot.png"}
    ];
  content.posts = [];
  content.links = [
    {type:"link", text:"linkedin", url:"http://linkedin.com/in/lucaswadedavis/en/", image:"./images/linkedin-128-black.png"},
    {type:"link", text:"twitter", url:"http://twitter.com/lukedavis", image:"./images/twitter-128-black.png"},
    {type:"link", text:"github", url:"http://github.com/lucaswadedavis", image:"./images/github-128-black.png"},
    {type:"link", text:"blog", url:"http://lucaswadedavis.com", image:"./images/blogger-128-black.png"},
    ];
  
  
  ////////////////////////////////////////////////////////////

  var css ={};
  
  css.colors = [
    {type:"css-color", color: darwa.rgb()},
    {type:"css-color", color: darwa.rgb()}
    ];
  css.borders = [
    {type:"css-border", width: darwa.int(3)},
    {type:"css-border", width: darwa.int(10)}
    ];
  
  ////////////////////////////////////////////////////////////
   
  
  template.container = function(x){
    return "<div class='container'>"+x+"</div>";
  };
  
  template.row = function(x){
    return "<div class='row'>"+x+"</div>";
  };
  
  template.column = function(x){
    var d = "";
    d += "<div class='";
      d += " col-sm-"+x.sm;
      d += " col-md-"+x.md;
      d += " col-lg-"+x.lg;
    d += "'>"+x.content+"</div>";
    return d;
  };
  
  
  
  ////////////////////////////////////////////////////////////  
 
  app.bloodlines = [];
  
  var Genome = function(){
    return _.shuffle(content.titles.concat(
      content.links, 
      content.posts, 
      content.images,
      css.colors,
      css.borders))
  };
  
  app.bloodlines.push( Genome() );
  
  ribosome = function(x){
    var html = "";
    var reziCSS = {};
    
    var lib ={};
    lib["title"] = function(x){
      html += template.column({sm:3,md:3,lg:3,content:x.text});
    };
    lib["image"] = function(x){
      var imgTag = "<img src='"+x.image+"' alt='"+x.text+"' />";
      html += template.column({sm:3,md:3,lg:3,content:imgTag});
    };
    lib["link"] = function(x){
      var d = "<a href='"+x.url+"'>";
        d += "<img src='"+x.image+"' alt='"+x.text+"' />";
      d += "</a>";
      html += template.column({sm:3,md:3,lg:3,content:d});
    };
    lib["css-color"] = function(x){
      reziCSS.body = {"background-color":x.color};
    };
    
    html += "<div class='container'>";
    for (var i=0;i<x.length;i++){ 
      if (!lib[x[i].type]){continue;}
      html += (i%4===0) ? "<div class='row'>" : "\n" ;
      lib[x[i].type](x[i]); 
      //console.log(x[i]);
      console.log(html);
      html += (i%4===0) ? "</div>" : "\n" ;
    }
    html += "</div>";
    return {html: html, css: reziCSS};
  };
  
  var rb = ribosome(app.bloodlines[0]);
  console.log(rb);
  rezi(rb.css);
  $(document).ready(function(){
    $("body").append(rb.html);
  });
  
  ////////////////////////////////////////////////////////////  

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = app;
    }
    exports.app = app;
  }
  else {
    root.app = app;
    if (dev === true){
      root.utils = utils;
      root.template = template;
      root.content = content;
    }
  }

  ////////////////////////////////////////////////////////////

}).call(this);