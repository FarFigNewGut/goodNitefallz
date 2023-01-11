/*
     FILE ARCHIVED ON 20:06:48 Nov 16, 2004 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 16:46:56 Aug 18, 2014.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
var MinimumPTP = 0;
var MinimumMTP = 0;
var Race = 0;
var Profession = 0;
var Physical = new Array(0, 1, 5, 6);
var Mental = new Array(3, 4, 7, 8);
var MinimumStats = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var Stat = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var EStat = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var BestStats = new Array(10);
var FinalStats = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
var GI = new Array(10);
var TotalPTP = 0;
var TotalMTP = 0;
var TotalTP = 0;
var BestPTP = 0;
var BestMTP = 0;
var BestTP = 0;
var BestRawPTP = 0;
var BestRawMTP = 0;
var BestRawTP = 0;
var RawPTP = 0;
var RawMTP = 0;
var RawTP = 0;
var Iterations = 1;
var Rand1 = 0;
var Rand2 = 0;
var Rand3 = 0;
var MaxLevel = 0;
var AllStats = new Array(10);
var PhysicalWeight = 1.0;
var MentalWeight = 1.0;
var ModifiedTotal;
var BestModifiedTotal;
var rawphy = 0;
var rawmen = 0;
var dicaur = 0;

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
  Stat = new Array(70, 70, 100, 20, 20, 90, 90, 20, 20, 90);
  MinimumPTP = parseInt(form.PTPMinimum.value);
  if (isNaN(MinimumPTP)) MinimumPTP = 0;
  MinimumMTP = parseInt(form.MTPMinimum.value);
  if (isNaN(MinimumMTP)) MinimumMTP = 0;
  Race = form.race.selectedIndex;
  Profession = form.profession.selectedIndex;
  for (var i = 0; i < 10; i++)
    GI[i] = ProfessionGI[Profession][i] + RaceGI[Race][i];

  for (var i = 0; i < 10; i++) {
    MinimumStats[i] = parseInt(form.MinimumStat[i].value);
    if (isNaN(MinimumStats[i])) MinimumStats[i] = 0;
  }
  PhysicalWeight = parseFloat(form.PhysicalWeight.value);
  if (isNaN(PhysicalWeight) || PhysicalWeight < 0) PhysicalWeight = 1.0;
  MentalWeight = parseFloat(form.MentalWeight.value);
  if (isNaN(MentalWeight) || MentalWeight < 0) MentalWeight = 1.0;

  InitializeStatArray(form); //set AllStats to initial values
  Iterations = form.Iterations.value; //get iterations from form
  MaxLevel = form.MaxLevel.value; //get level to optimize for

  SetUpStatArray(); //set up big array of AllStats

  for (var i = 0; i < 10; i++) BestStats[i] = Stat[i]; //save first stat set as best

  CalculateTotalTP(); //get total points this set yields

  BestModifiedTotal = TotalPTP * PhysicalWeight + TotalMTP * MentalWeight;
  BestRawPTP = RawPTP;
  BestRawMTP = RawMTP;
  BestRawTP = RawTP;
  BestPTP = TotalPTP;
  BestMTP = TotalMTP;
  BestTP = TotalTP;

  //main loop
  for (
    var i = 0;
    i < Iterations;
    i++ //test this many stat sets
  ) {
    Rand1 = Math.floor(Math.random() * 10); //AllStats to add & subtract
    do {
      Rand2 = Math.floor(Math.random() * 10);
    } while (Rand1 == Rand2); //don't +/- same stat
    Rand3 = Math.floor(Math.random() * 20) + 1; //amount to add & subtract
    Stat[Rand1] += Rand3;
    Stat[Rand2] -= Rand3;
    if (IsWithinGameParameters() > 0 || IsAboveUserMinimums() > 0) {
      //if illegal, swap back
      Stat[Rand1] -= Rand3;
      Stat[Rand2] += Rand3;
    } //else test this stat set
    else {
      CalculateTotalTP(); //test this set of AllStats

      ModifiedTotal = TotalPTP * PhysicalWeight + TotalMTP * MentalWeight;

      if (
        ModifiedTotal > BestModifiedTotal ||
        (ModifiedTotal == BestModifiedTotal) & (RawTP > BestRawTP)
      ) {
        //if this set is better...
        BestRawPTP = RawPTP;
        BestRawMTP = RawMTP;
        BestRawTP = RawTP;
        BestPTP = TotalPTP;
        BestMTP = TotalMTP;
        BestTP = TotalTP;
        BestStats[Rand1] = Stat[Rand1]; //update better AllStats
        BestStats[Rand2] = Stat[Rand2];
        BestModifiedTotal = ModifiedTotal;
      } //end stuff to do if stat set is better
      else {
        //if stat set isn't better, swap back
        Stat[Rand1] = BestStats[Rand1];
        Stat[Rand2] = BestStats[Rand2];
      } //end else
    } //end else portion
  } //end main loop

  Display(form);

  return;
}

//sets AllStats to middle range so program can hop from there
function SetStatsToMiddle() {
  var Pool = 0;
  for (var i = 0; i < 10; i++) {
    while (IsWithinGameParameters() == 0 && IsAboveUserMinimums() == 0) {
      Stat[i]--;
      Pool++;
    }
    Stat[i]++;
    Pool--;
  }
  while (Pool > 0) {
    Stat[MinimumStat()]++;
    Pool--;
  }
  return;
}

//returns the index number of the minimum stat
function MinimumStat() {
  var LowestIndex = 0;
  var Lowest = 100;
  for (var i = 0; i < 10; i++)
    if (Stat[i] < Lowest) {
      Lowest = Stat[i];
      LowestIndex = i;
    }
  return LowestIndex;
}

//Calculates PTP, MTP, and TotalTP over career
function CalculateTotalTP() {
  //calculate TP's for level 0
  dicaur = Math.floor(
    (Stat[2] * ProfessionMod[Profession][2] +
      Stat[9] * ProfessionMod[Profession][9]) /
      2
  );
  RawPTP =
    25 +
    (dicaur +
      Stat[0] * ProfessionMod[Profession][0] +
      Stat[1] * ProfessionMod[Profession][1] +
      Stat[5] * ProfessionMod[Profession][5] +
      Stat[6] * ProfessionMod[Profession][6]) /
      20;
  RawMTP =
    25 +
    (dicaur +
      Stat[3] * ProfessionMod[Profession][3] +
      Stat[4] * ProfessionMod[Profession][4] +
      Stat[7] * ProfessionMod[Profession][7] +
      Stat[8] * ProfessionMod[Profession][8]) /
      20;
  TotalPTP = Math.floor(RawPTP);
  TotalMTP = Math.floor(RawMTP);

  //main inner loop
  for (
    var i = 1;
    i <= MaxLevel;
    i++ //figure TP's to max level
  ) {
    dicaur = Math.floor(
      (AllStats[2][Stat[2]][i] * ProfessionMod[Profession][2] +
        AllStats[9][Stat[9]][i] * ProfessionMod[Profession][9]) /
        2
    );
    rawphy =
      25 +
      (dicaur +
        AllStats[0][Stat[0]][i] * ProfessionMod[Profession][0] +
        AllStats[1][Stat[1]][i] * ProfessionMod[Profession][1] +
        AllStats[5][Stat[5]][i] * ProfessionMod[Profession][5] +
        AllStats[6][Stat[6]][i] * ProfessionMod[Profession][6]) /
        20;
    rawmen =
      25 +
      (dicaur +
        AllStats[3][Stat[3]][i] * ProfessionMod[Profession][3] +
        AllStats[4][Stat[4]][i] * ProfessionMod[Profession][4] +
        AllStats[7][Stat[7]][i] * ProfessionMod[Profession][7] +
        AllStats[8][Stat[8]][i] * ProfessionMod[Profession][8]) /
        20;
    TotalPTP += Math.floor(rawphy);
    TotalMTP += Math.floor(rawmen);
    RawPTP += rawphy;
    RawMTP += rawmen;
  } //end for

  TotalTP = TotalPTP + TotalMTP;
  RawTP = RawPTP + RawMTP;
  return;
}

//sets AllStats at initial value which meets user requirements
function InitializeStatArray(form) {
  SetStatsToMinimum(); //sets AllStats to minimum requirements
  //on form, prime AllStats to 60, 20 all others
  MaxOutStats(); //Sets AllStats to 660, max PTP
  MaxRestOfStats(); //max physical AllStats, then mental
  CheckMTPMinimum(); //check if MTP minimum is possible
  SetStatsToMiddle(); //set AllStats to middle range
  return;
}

//checks legality, sets AllStats to 660, maxes out PTP
function MaxOutStats() {
  //*NEW*
  if (IsWithinGameParameters() == 1)
    NotPossible2("Minimum starting stats are not within game parameters");
  if (TotalStats() > 660) {
    for (var i = 0; i < 10; i++)
      if ((MinimumStats[i] < 30) & (ProfessionMod[Profession][i] == 2)) {
        NotPossible2("Prime stats must be at least 30.");
        return;
      }
    NotPossible2(
      "Stat set totals " + TotalStats() + "\nMaximum allowed is 660"
    );
  }
  return;
}

//max out physical AllStats, then mental
function MaxRestOfStats() {
  for (var i = 0; i < 4; i++) {
    Stat[Physical[i]] = 100; //max out physical AllStats
    while (TotalStats() > 660 || IsWithinGameParameters() == 1)
      Stat[Physical[i]]--;
  }
  for (var i = 0; i < 4; i++) {
    Stat[Mental[i]] = 100; //max out mental AllStats
    while (TotalStats() > 660 || IsWithinGameParameters() == 1)
      Stat[Mental[i]]--;
  }
  return;
}

//sets AllStats to the minimum AllStats on form, 30 for prime, 20 all others
function SetStatsToMinimum() {
  //*NEW*
  for (var i = 0; i < 10; i++) {
    Stat[i] = MinimumStats[i];
    if (Stat[i] < 20) Stat[i] = 20;
    if ((Stat[i] < 30) & (ProfessionMod[Profession][i] == 2)) Stat[i] = 30;
    if (Stat[i] > 100) NotPossible2("Stats cannot be greater than 100");
  }
  return;
}

//Check if MTP minimum is possible; adjust AllStats to meet it
function CheckMTPMinimum(form) {
  if (CalculatePTP() < MinimumPTP)
    //PTP already maxed; if below
    NotPossible2("Physical training point minimum not attainable.");
  //minimum, exit program
  if (CalculateMTP() >= MinimumMTP)
    //if MTP are above minimum
    return; //criteria are met; return
  for (
    var i = 0;
    i < 4;
    i++ //go through each mental, add as much
  )
    for (
      var j = 0;
      j < 4;
      j++ //as possible from each physical
    ) {
      if (MinimumStats[Physical[j]] < 20)
        //set minimum physical
        MinimumStats[Physical[j]] = 20; //stats to 20 if not yet set
      Stat[Mental[i]] += Stat[Physical[j]] - MinimumStats[Physical[j]];
      Stat[Physical[j]] = MinimumStats[Physical[j]];
      while (IsWithinGameParameters() == 1 || IsAboveUserMinimums() == 1) {
        Stat[Mental[i]]--;
        Stat[Physical[j]]++;
      } //end while
    } //end nested for loop
  if (IsAboveUserMinimums() > 0)
    //if MTP still not met
    NotPossible2("Mental training point minimum not attainable.");
  return;
} //end CheckMTPMinimum function

//Do current AllStats meet user criteria for starting AllStats?
//Return 0=yes, 1=no
function IsAboveUserMinimums() {
  if (CalculateMTP() < MinimumMTP)
    //if MTP's are low
    return 2; //return code for MTP being low
  if (CalculatePTP() < MinimumPTP)
    //if PTP's are low
    return 1; //return false
  for (
    var i = 0;
    i < 10;
    i++ //if any stat is low
  )
    if (Stat[i] < MinimumStats[i]) return 1; //return false
  return 0; //return true
}

//Do current AllStats meet game parameters for starting AllStats?
//Return 0=yes, 1=no
function IsWithinGameParameters() {
  //*NEW*
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

//Displays all info below the calculate button
function Display(form) {
  for (var i = 0; i < 10; i++) form.CurrentStat[i].value = Stat[i];
  form.TotalPTP.value = BestPTP;
  form.TotalMTP.value = BestMTP;
  form.TotalTP.value = BestTP;
  form.StartingPTP.value = CalculatePTP();
  form.StartingMTP.value = CalculateMTP();

  for (var j = 0; j < 10; j++)
    form.FinalStat[j].value = AllStats[j][Stat[j]][MaxLevel];

  for (var j = 0; j < 10; j++) FinalStats[j] = form.FinalStat[j].value;

  form.EndingPTP.value = CalculateEPTP();
  form.EndingMTP.value = CalculateEMTP();
  return;
}

//returns total of current AllStats
function TotalStats() {
  var total = 0;
  for (var i = 0; i < 10; i++) total = total + Stat[i];
  return total;
}

//inputs stat array, returns PTP's
function CalculatePTP() {
  return Math.floor(
    25 +
      (Math.floor(
        (Stat[2] * ProfessionMod[Profession][2] +
          Stat[9] * ProfessionMod[Profession][9]) /
          2
      ) +
        Stat[0] * ProfessionMod[Profession][0] +
        Stat[1] * ProfessionMod[Profession][1] +
        Stat[5] * ProfessionMod[Profession][5] +
        Stat[6] * ProfessionMod[Profession][6]) /
        20
  );
}

//inputs stat array, returns MTP's
function CalculateMTP() {
  return Math.floor(
    25 +
      (Math.floor(
        (Stat[2] * ProfessionMod[Profession][2] +
          Stat[9] * ProfessionMod[Profession][9]) /
          2
      ) +
        Stat[3] * ProfessionMod[Profession][3] +
        Stat[4] * ProfessionMod[Profession][4] +
        Stat[7] * ProfessionMod[Profession][7] +
        Stat[8] * ProfessionMod[Profession][8]) /
        20
  );
}

//input stat array, returns PTP's
function CalculateEPTP() {
  return Math.floor(
    25 +
      (Math.floor(
        (FinalStats[2] * ProfessionMod[Profession][2] +
          FinalStats[9] * ProfessionMod[Profession][9]) /
          2
      ) +
        FinalStats[0] * ProfessionMod[Profession][0] +
        FinalStats[1] * ProfessionMod[Profession][1] +
        FinalStats[5] * ProfessionMod[Profession][5] +
        FinalStats[6] * ProfessionMod[Profession][6]) /
        20
  );
}

//inputs stat array, returns MTP's
function CalculateEMTP() {
  return Math.floor(
    25 +
      (Math.floor(
        (FinalStats[2] * ProfessionMod[Profession][2] +
          FinalStats[9] * ProfessionMod[Profession][9]) /
          2
      ) +
        FinalStats[3] * ProfessionMod[Profession][3] +
        FinalStats[4] * ProfessionMod[Profession][4] +
        FinalStats[7] * ProfessionMod[Profession][7] +
        FinalStats[8] * ProfessionMod[Profession][8]) /
        20
  );
}
//displays not possible prompt and exits program
function NotPossible() {
  window.alert(x);
  window.abort(); //syntax error, but it stops the program as intended
}

//displays not possible prompt and exits program
function NotPossible2(x) {
  window.alert(x);
  window.abort(); //syntax error, but it stops the program as intended
}

//resets all text fields
function Clean(form) {
  for (var i = 0; i < form.length; i++)
    if (form.elements[i].type == "text")
      //clear only text fields
      form.elements[i].value = "";
  form.elements[14].value = 100;
  form.elements[17].value = 1000;
  form.elements[18].value = 1.0;
  form.elements[19].value = 1.0;
  return;
}

//sets up array of all AllStats at each level for every possibility
function SetUpStatArray() {
  var stat;
  for (
    var i = 0;
    i < 10;
    i++ //create 3-dimensional array
  ) {
    //to hold each stat, at each level,
    AllStats[i] = new Array(101); //for each starting value
    for (var j = 20; j < 101; j++) {
      stat = j;
      AllStats[i][j] = new Array(161);
      for (var k = 1; k <= MaxLevel; k++) {
        if (stat < GI[i] || (stat < 100) & (k % Math.floor(stat / GI[i]) == 0))
          stat++; //stat grows
        AllStats[i][j][k] = stat;
      } //end k loop
    } //end j loop
  } //end i loop
  return;
}
