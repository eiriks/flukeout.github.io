var level;
var currentLevel = parseInt(localStorage.currentLevel) || 0;
var levelTimeout = 1000;
var fails = 0;


$(document).ready(function(){

  $(".note-toggle").on("click", function(){
    $(this).hide();
    $(".note").slideToggle();
  });

  $(".level-menu-toggle-wrapper").on("click",function(){
    $(".level-menu").toggleClass("open");
  });
  //Handle inputs from the input box on enter
  $("input").on("keypress",function(e){
    e.stopPropagation();
    if(e.keyCode ==  13){
      enterHit();
      return false;
    }
  });

  $("input").on("keyup",function(e){
    e.stopPropagation();
    var length = $(this).val().length;
    if(length > 0) {
      $("input").removeClass("input-strobe");
    } else {
      $("input").addClass("input-strobe");
    }
  });

  $(".editor").on("click",function(){
    $("input").focus();
  });

  //Add tooltips
  $(".spisebord").on("mouseover","*",function(e){
    e.stopPropagation();
    showTooltip($(this));
  });

  //Shows the tooltip on the table
  $(".markup").on("mouseover","div *",function(e){

    el = $(this);
    //console.log(el);
    var markupElements = $(".markup *");
    var index = markupElements.index(el) -1;

    showTooltip($(".spisebord *").eq(index));
    e.stopPropagation();
  });

  //Shows the tooltip on the table
  $(".markup").on("mouseout","*",function(e){
    e.stopPropagation();
    hideTooltip();
  });

  $(".spisebord").on("mouseout","*",function(e){
    hideTooltip();
    e.stopPropagation();
  });

  $(".enter-button").on("click",function(){
    enterHit();
  })

  $(".table-wrapper,.table-edge").css("opacity",0);

  buildLevelmenu();

  setTimeout(function(){
    loadLevel();
    $(".table-wrapper,.table-edge").css("opacity",1);
  },50);

});

function buildLevelmenu(){
  for(var i = 0; i < levels.length; i++){
    var level = levels[i];
    var item = document.createElement("a");
    $(item).html(level.syntax);
    $(".level-menu .levels").append(item);
    $(item).on("click",function(){
      currentLevel = $(this).index();
      loadLevel();
    });
  }
}

function hideTooltip(){
  $(".enhance").removeClass("enhance");
  $("[data-hovered]").removeAttr("data-hovered");
  $(".helper").hide();
}

function showTooltip(el){
  el.attr("data-hovered",true);
  var tableElements = $(".spisebord *");
  var index = tableElements.index(el);
  var that = el;
  $(".markup > div *").eq(index).addClass("enhance").find("*").addClass("enhance");

  var helper = $(".helper");

  var pos = el.offset();
  helper.css("top",pos.top - 65);
  helper.css("left",pos.left + (el.width()/2));

  var helpertext;

  var elType = el.get(0).tagName;
  elType = elType.toLowerCase();
  helpertext = '<' + elType;

  var elClass = el.attr("class");

  if(elClass) {
    if(elClass.indexOf("strobe") > -1){
      elClass = elClass.replace("strobe","");
    }
  }

  if(elClass) {
    helpertext = helpertext + ' class="' + elClass + '"';
  }

  var id = el.attr("id");
  if(id) {
    helpertext = helpertext + ' id="' + id + '"';
  }

  helpertext = helpertext + '></' + elType + '>';
  helper.show();
  helper.text(helpertext);

}

//Animate the enter button
function enterHit(){
  $(".enter-button").removeClass("enterhit");
  $(".enter-button").width($(".enter-button").width());
  $(".enter-button").addClass("enterhit");
  var value = $("input").val();
  handleInput(value);
}


//Parses text from the input field
function handleInput(text){

  if(text == ""){
    text = "blammojammo";
  }
  //console.log(text);

  if(parseInt(text) > 0 && parseInt(text) < levels.length+1) {
    currentLevel = parseInt(text) -1;
    loadLevel();
    return;
  }

  if(text == "help" || text == "hjelp") {
    showHelp();
  } else {
    fireRule(text);
  }
}

//Shows help
function showHelp() {

  $("input").val("");
  var helpTitle = level.helpTitle || "";
  var help = level.help || "";
  var examples = level.examples ||[];
  var selector = level.selector || "";
  var syntax = level.syntax || "";
  var syntaxExample = level.syntaxExample || "";
  var selectorName = level.selectorName || "";

  $(".display-help .syntax").html(syntax);
  $(".display-help .syntax-example").html(syntaxExample);
  $(".display-help .selector-name").html(selectorName);
  $(".display-help .title").html(helpTitle);
  $(".display-help .examples").html("");

  for(var i = 0; i < examples.length; i++){
    var example = $("<div class='example'>" + examples[i] + "</div>");
    $(".display-help .examples").append(example);
  }
  $(".display-help .hint").html(help);
  $(".display-help .selector").text(selector);
}

function resetTable(){
  $(".display-help").removeClass("open-help");
  $(".clean,.strobe").removeClass("clean,strobe");
  $(".clean,.strobe").removeClass("clean,strobe");
  $("input").addClass("input-strobe");
  $(".spisebord *").each(function(){
    $(this).width($(this).width());
    $(this).removeAttr("style");
  });
  $(".table-edge").width($(".spisebord").outerWidth());
}

function fireRule(rule) {

  // prevent cheating
  if(rule === ".strobe") {
    rule = null;
  }

  $(".shake").removeClass("shake");

  $(".strobe,.clean,.shake").each(function(){
    $(this).width($(this).width());
    $(this).removeAttr("style");
  });

  /*
  * Sean Nessworthy <sean@nessworthy.me>
  * On 03/17/14
  *
  * Allow [div][.table] to preceed the answer.
  * Makes sense if div.table is going to be included in the HTML viewer
  * and users want to try and use it in their selectors.
  *
  * However, if it is included as a specific match, filter it out.
  * This resolves the  "Match all the things!" level from beheading the table too.
  * Relatedly, watching that happen made me nearly spill my drink.
  */

  var baseTable = $('.table-wrapper > .spisebord');

  var ruleSelected = $(".table-wrapper " + rule).not(baseTable);
  var levelSelected = $(".table-wrapper " + level.selector).not(baseTable);

  var win = false;

  //If nothing is selected
  if(ruleSelected.length == 0) {
    $(".editor").addClass("shake");
  }

  if(ruleSelected.length == levelSelected.length && ruleSelected.length > 0){
    win = checkResults(ruleSelected,levelSelected);
  }

  if(win){
    ruleSelected.removeClass("strobe");
    ruleSelected.addClass("clean");
    // $(".result").text("Good job!");
    $("input").val("");
    $(".input-wrapper").css("opacity",.2);
    currentLevel++;
    if(currentLevel >= levels.length) {
      winGame();
    } else {
      setTimeout(function(){
        loadLevel();
      },levelTimeout);
    }

  } else {

    continueRule();

    ruleSelected.removeClass("strobe");
    ruleSelected.addClass("shake");

    setTimeout(function(){
      $(".shake").removeClass("shake");
      $(".strobe").removeClass("strobe");
      levelSelected.addClass("strobe");
    },500);

    // $(".result").text("Wrong! Try again :D");
    $(".result").fadeOut();

  }

}

function winGame(){
  $(".spisebord").html('<span class="winner"><strong>Du fikk det til!</strong><br>Du er en CSS Gud.</span>');
  resetTable();

}

function checkResults(ruleSelected,levelSelected){
  //console.log(ruleSelected,levelSelected);
  for(var i = 0; i < ruleSelected.length; i++) {
    if(ruleSelected[i] == levelSelected[i]){
    } else {
      return false;
    }
  }
  return true;
}

var d = 2;
function continueRule() {
  console.log("Fails thus far: " + ++fails)
}


function loadBoard(){

  var boardString = level.board;
  boardMarkup = "";
  var tableMarkup = "";
  var markup = "";
  showHelp();

  for(var i = 0;i < boardString.length;i++){

    var c = boardString.charAt(i);

    if(c == "C") {
      boardMarkup = boardMarkup + '<carrot/>\n'
      markup = markup + "<div>&ltcarrot/&gt</div>";
    }
    if(c == "A") {
      boardMarkup = boardMarkup + '<eple/>\n'
      markup = markup + "<div>&lteple/&gt</div>";
    }
    if(c == "O") {
      boardMarkup = boardMarkup + '<appelsin/>\n'
      markup = markup + "<div>&ltappelsin/&gt</div>";
    }
    if(c == "P") {
      boardMarkup = boardMarkup + '<agurk/>\n'
      markup = markup + '<div>&ltagurk/&gt</div>';
    }
    if(c == "a") {
      boardMarkup = boardMarkup + '<eple class="liten"/>\n'
      markup = markup + '<div>&lteple class="liten"/&gt</div>';
    }
    if(c == "o") {
      boardMarkup = boardMarkup + '<appelsin class="liten"/>\n'
      markup = markup + '<div>&ltappelsin class="liten"/&gt</div>';
    }
    if(c == "p") {
      boardMarkup = boardMarkup + '<agurk class="liten"/>\n'
      markup = markup + '<div>&ltagurk class="liten"/&gt</div>';
    }
    if(c == "{") {
      boardMarkup = boardMarkup + '<tallerken id="fancy">'
      markup = markup + '<div>&lttallerken id="fancy"&gt';
    }
    if(c == "(") {
      boardMarkup = boardMarkup + '<tallerken>'
      markup = markup + '<div>&lttallerken&gt'
    }
    if(c == ")" || c == "}") {
      boardMarkup = boardMarkup + '</tallerken>\n'
      markup = markup + '&lt/tallerken&gt</div>'
    }
    if(c == "[") {
      boardMarkup = boardMarkup + '<bento>'
      markup = markup + '<div>&ltbento&gt'
    }
    if(c == "]") {
      boardMarkup = boardMarkup + '</bento>\n'
      markup = markup + '&lt/bento&gt</div>'
    }

  }
  $(".spisebord").html(boardMarkup);
  $(".markup").html('<div>&ltdiv class="spisebord"&gt' + markup + '&lt/div&gt</div>');
}

//Loads up a level
function loadLevel(){
  level = levels[currentLevel];

  // Show the help link only for the first three levels
  if(currentLevel < 3) {
    $(".note-toggle").show();
  } else {
    $(".note-toggle").hide();
  }

  $(".level-menu .current").removeClass("current");
  $(".level-menu div a").eq(currentLevel).addClass("current");

  var percent = (currentLevel+1)/levels.length * 100;
  $(".progress").css("width",percent + "%");

  localStorage.setItem("currentLevel",currentLevel);

  loadBoard();
  resetTable();

  $(".level-header").html("Nivå " + (currentLevel+1) + " av " + levels.length);
  $(".order").text(level.doThis);
  $("input").val("").focus();


  $(".input-wrapper").css("opacity",1);
  $(".result").text("");

  //Strobe what's supposed to be selected
  $(".spisebord " + level.selector).addClass("strobe");

}
