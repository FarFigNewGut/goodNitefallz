/*
     FILE ARCHIVED ON 9:42:05 Jul 22, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 1:00:30 Aug 20, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
var professions = new Array(
  "Warrior",
  "Rogue",
  "Wizard",
  "Cleric",
  "Empath",
  "Sorcerer",
  "Ranger",
  "Bard",
  "Paladin",
  "Savant",
  "Monk"
);
var races = new Array(
  "a Dark Elf",
  "a Dwarf",
  "an Elf",
  "a Giantman",
  "a Half-Elf",
  "a Halfling",
  "a Human",
  "a Sylvankind",
  "a Forest Gnome",
  "a Burghal Gnome",
  "a Half-Krolvin",
  "an Erithian",
  "an Aelotoi"
);
var colors = new Array("Black", "Red", "Blue", "Lime", "Magenta", "Yellow");
var stats = new Array(
  "CO",
  "DE",
  "DI",
  "LO",
  "IT",
  "ST",
  "AG",
  "IF",
  "WI",
  "AU"
);
var statorder = new Array(10);
var Race = 0;
var Profession = 0;
var MinimumStats = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var Stat = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var GI = new Array(10);
var MaxLevel = 100;
var PointLeftover = 0;

//set up array of each profession's prime stat modifiers
//CO DE DI LO IT ST AG IF WI AU
var ProfessionMod = [
  [2, 1, 1, 1, 1, 2, 1, 1, 1, 1], //Warrior
  [1, 2, 1, 1, 1, 1, 2, 1, 1, 1], //Rogue
  [1, 1, 1, 2, 1, 1, 1, 1, 1, 2], //Wizard
  [1, 1, 1, 1, 2, 1, 1, 1, 2, 1], //Cleric
  [1, 1, 1, 1, 1, 1, 1, 2, 2, 1], //Empath
  [1, 1, 1, 1, 1, 1, 1, 1, 2, 2], //Sorceror
  [1, 2, 1, 1, 2, 1, 1, 1, 1, 1], //Ranger
  [1, 1, 1, 1, 1, 1, 1, 2, 1, 2], //Bard
  [1, 1, 1, 1, 1, 2, 1, 1, 2, 1], //Paladin
  [1, 1, 2, 1, 1, 1, 1, 2, 1, 1], //Savant
  [1, 1, 1, 1, 1, 2, 2, 1, 1, 1], //Monk
];

//set up array of GI's by profession
// CO DE DI LO IT ST AG IF WI AU
var ProfessionGI = [
  [25, 25, 20, 10, 20, 30, 25, 20, 15, 15], //Warrior
  [20, 25, 20, 20, 25, 25, 30, 15, 10, 15], //Rogue
  [15, 25, 20, 25, 25, 10, 15, 20, 20, 30], //Wizard
  [20, 10, 25, 25, 25, 20, 15, 20, 30, 15], //Cleric
  [20, 15, 25, 25, 20, 10, 15, 25, 30, 20], //Empath
  [15, 20, 25, 25, 20, 10, 15, 20, 25, 30], //Sorceror
  [20, 30, 20, 15, 25, 25, 20, 10, 25, 15], //Ranger
  [20, 25, 15, 10, 15, 25, 20, 30, 20, 25], //Bard
  [25, 20, 25, 10, 15, 30, 20, 20, 25, 15], //Paladin
  [15, 15, 25, 25, 20, 10, 20, 30, 25, 20], //Savant
  [25, 20, 25, 20, 20, 25, 30, 10, 15, 15], //Monk
];

//set up array of GI's by race
// CO DE DI LO IT ST AG IF WI AU
var RaceGI = [
  [-2, 5, -2, 0, 0, 0, 5, 0, 0, 0], //Dark Elf
  [5, -3, 3, 0, 0, 5, -5, -2, 3, 0], //Dwarf
  [-5, 5, -5, 0, 0, 0, 3, 3, 0, 5], //Elf
  [3, -2, 0, 0, 2, 5, -2, 0, 0, 0], //Giantman
  [0, 2, -2, 0, 0, 2, 2, 2, 0, 0], //Half-Elf
  [5, 5, -2, -2, 0, -5, 5, 0, 0, 0], //Halfling
  [2, 0, 0, 0, 2, 2, 0, 0, 0, 0], //Human
  [-2, 5, -5, 0, 0, -3, 5, 3, 0, 3], //Sylvankind
  [2, 2, 2, 0, 0, -3, 3, 0, 0, 0], //Forest Gnome
  [0, 3, -3, 5, 5, -5, 3, 0, 0, -2], //Burghal Gnome
  [5, 2, 0, -2, 0, 3, 2, -2, 0, -2], //Half-Krolvin
  [0, 0, 3, 2, 0, -2, 0, 3, 0, 0], //Erithian
  [-2, 3, 2, 0, 2, 0, 3, -2, 0, 0], //Aelotoi
];

//Inputs the form and calculates the optimal placement
function Calculate(form) {
  //initialize starting value
  Stat = new Array(20, 20, 20, 20, 20, 20, 20, 20, 20, 20);
  Race = form.race.selectedIndex;
  Profession = form.profession.selectedIndex;
  for (var i = 0; i < 10; i++)
    GI[i] = ProfessionGI[Profession][i] + RaceGI[Race][i];
  for (var i = 0; i < 10; i++) {
    MinimumStats[i] = parseInt(form.MinimumStat[i].value);
    if (isNaN(MinimumStats[i])) MinimumStats[i] = 0;
  }
  InitializeStatArray(form); //set AllStats to initial values
  CalculateMaximum(); //calculate placement that yields max stats
  Display(form);
  return;
}

//calculate the initial placement that yields the maximum total stats at 100
function CalculateMaximum() {
  var highest = 0;
  var used = 0;
  for (
    var i = 0;
    i < 10;
    i++ //set statorder[] to hold stats in order of GI's
  ) {
    highest = 0;
    for (var j = 0; j < 10; j++) {
      used = 0;
      for (var k = 0; k < i; k++) if (statorder[k] == j) used = 1;
      if ((GI[j] > highest) & (used != 1)) {
        highest = GI[j];
        statorder[i] = j;
      }
    }
  }
  for (var i = 9; i >= 0; i--) {
    while (
      (StatAtOneHundred(Stat[statorder[i]], GI[statorder[i]]) < 100) &
      (TotalStats() < 660)
    ) {
      Stat[statorder[i]]++;
      if (IsWithinGameParameters() == 1) {
        Stat[statorder[i]]--;
        break;
      }
    }
    //if the stat-1 grows to the same as the stat then set stat = stat-1
    if (
      StatAtOneHundred(Stat[statorder[i]] - 1, GI[statorder[i]]) ==
      StatAtOneHundred(Stat[statorder[i]], GI[statorder[i]])
    ) {
      Stat[statorder[i]]--;
      if (IsWithinGameParameters() == 1) Stat[statorder[i]]++;
      if (TotalStats() == 659) {
        PointLeftover = 1;
        break;
      }
    }
  }

  return;
}

//sets Stats to initial value which meets user requirements
function InitializeStatArray(form) {
  for (var i = 0; i < 10; i++)
    if (ProfessionMod[Profession][i] == 2) Stat[i] = 30;
  for (i = 0; i < 10; i++)
    while (StatAtOneHundred(Stat[i], GI[i]) < MinimumStats[i]) {
      Stat[i]++;
      if (TotalStats() > 660 || IsWithinGameParameters() == 1)
        NotPossible("Stats are not attainable.");
    }
  return;
}

//inputs an initial stat and GI; returns that stat at level 100
function StatAtOneHundred(stat, GI) {
  for (
    var k = 1;
    k <= MaxLevel;
    k++ //MaxLevel should be 100
  ) {
    if (stat < GI || (stat < 100) & (k % Math.floor(stat / GI) == 0)) stat++;
  }
  if (stat > 100) stat = 100;
  return stat;
}

//Do current Stats meet game parameters for starting Stats?
//Return 0=yes, 1=no
function IsWithinGameParameters() {
  var AllStats_over_70 = 0;
  var AllStats_over_90 = 0;
  for (var i = 0; i < 10; i++) {
    //if either prime stat is below 30
    if ((Stat[i] < 30) & (ProfessionMod[Profession][i] == 2)) return 1; //return false

    if (Stat[i] > 70 + 10 * (ProfessionMod[Profession][i] - 1)) {
      AllStats_over_70++; //count AllStats over 70 and 90
      if (Stat[i] > 90 + 10 * (ProfessionMod[Profession][i] - 1))
        AllStats_over_90++;
    } //end if
    //check each stat for <20 or >100
    if (Stat[i] > 100 || Stat[i] < 20) return 1; //return false
  } //end for loop
  //if more than 4 over 70, or 1 over 90
  if (AllStats_over_70 > 4 || AllStats_over_90 > 1) return 1; //return false
  return 0; //return true
} //end IsWithinGameParameters function

//returns total of current Stats
function TotalStats() {
  var total = 0;
  for (var i = 0; i < 10; i++) total = total + Stat[i];
  return total;
}

//displays not possible prompt and exits program
function NotPossible(x) {
  window.alert(x);
  window.abort(); //syntax error, but it stops the program as intended
}

//resets all text fields
function Clean(form) {
  for (var i = 0; i < form.length; i++)
    if (form.elements[i].type == "text")
      //clear only text fields
      form.elements[i].value = "";
  return;
}

//Displays the output page
function Display(form) {
  var localcolors = new Array(10);
  for (var i = 0; i < 10; i++) localcolors[i] = "Black";
  var currentcolor = 0;

  for (var i = 0; i < 10; i++)
    for (var j = i + 1; j < 10; j++)
      if (GI[j] == GI[i]) {
        if (localcolors[i] == "Black") {
          currentcolor++;
          localcolors[i] = colors[currentcolor];
        }
        if (localcolors[j] == "Black") localcolors[j] = colors[currentcolor];
      }

  document.write("<HTML><HEAD><TITLE>Maximized Stats</TITLE>");
  document.write(
    "<STYLE>TD {text-align: center; font-family: verdana; font-size: large;} </STYLE>"
  );

  document.write('</HEAD><BODY BACKGROUND="static/paper002.jpg">');
  document.write(
    '<TABLE BORDER=3 COLS=12 WIDTH="80%" ALIGN=Center CELLPADDING=5><TR>'
  );

  document.write(
    "<TD COLSPAN=12>Maximized stats for " +
      races[Race] +
      " " +
      professions[Profession] +
      "</TD></TR>"
  );
  document.write("<TR><TD></TD><TD></TD>");
  for (var i = 0; i < 10; i++) {
    document.write("<TD><FONT COLOR=" + localcolors[i] + ">" + stats[i]);
    if (ProfessionMod[Profession][i] == 2) document.write("*");
    document.write(" </FONT></TD>");
  }
  document.write("</TR><TR>");

  document.write("<TR><TD COLSPAN=2>GI's</TD>");
  for (var i = 0; i < 10; i++)
    document.write(
      "<TD><FONT COLOR=" + localcolors[i] + ">" + GI[i] + "  </FONT></TD>"
    );

  document.write("<TR><TD COLSPAN=2>Initial Placement</TD>");
  for (var i = 0; i < 10; i++)
    document.write(
      "<TD><FONT COLOR=" + localcolors[i] + ">" + Stat[i] + " </FONT></TD>"
    );

  document.write("<TR><TD COLSPAN=2>Stats at Level 100</TD>");
  for (var i = 0; i < 10; i++)
    document.write(
      "<TD><FONT COLOR=" +
        localcolors[i] +
        ">" +
        StatAtOneHundred(Stat[i], GI[i]) +
        " </FONT></TD>"
    );
  document.write("</TR>");

  if (PointLeftover == 1)
    document.write(
      "<TR><TD COLSPAN=12><FONT COLOR=Red>One point is left over--placing it in any stat makes no difference to stats at level 100.</FONT></TD></TR>"
    );

  document.write("</TABLE>");

  document.write(
    "<P><CENTER>* denotes prime stat<BR>Except for stats in black, stats of the same color have the same growth rate, thus their initial placement is interchangeable.<BR>(Prime stats must remain at least 30, however.)"
  );

  document.write("</BODY></HTML>");
  return;
}
