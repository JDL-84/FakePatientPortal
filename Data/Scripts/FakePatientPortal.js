/**
 * Summary. Fake Patient Portal
 *
 * Description. Gimmick holding site. Prints generated patient data is teletype format with Hunt for Red October soundbyte. 
 *
 * @author JDL-84
 * @linkhttps://jdl-84.github.io/FakePatientPortal/Data/FakePatientPortal.js
 */
 
 
/** TypeSpeed - How fast each CHAR is written **/
var TypeSpeed = 26;

/** TerminalInputName - The ID of the textarea we're typing too. **/
var TerminalInputName = "terminal-output";

/** TeleTypeNoise - Audio Object ID **/
var TeleTypeNoise = "TeleTypeNoise";

/** TerminalBuffer - How many patient records before we trim the top rows **/
var TerminalBuffer = 100;

/** Sound Functions **/
function playAudio() 
{
  var x = document.getElementById("TeleTypeNoise"); 
  x.play();
}

function StopAudio() 
{
  var x = document.getElementById("TeleTypeNoise"); 
  x.pause();
  x.currentTime = 0;
}
/** End of Sound Functions **/


/** Terminal Screen Buffer **/
function countNewlines(haystack)
{
    return count('\n', haystack);
}

function count(needle, haystack)
{
    var num = 0,
        len = haystack.length;
    for (var i=0; i < len; i++)
    {
        if (haystack.charAt(i) === needle)
        {
             num++;
        }
    }
    return num;
}

function tail(limit, haystack)
{
    var lines = countNewlines(haystack) + 1;
    if (lines > limit)
    {
        return haystack
            .split('\n')
            .slice(-limit)
            .join('\n');
    }
    return haystack;
}

function TextAreaTrim()
{
	var TextArea =  document.getElementById(TerminalInputName); 
	var text = tail(TerminalBuffer, TextArea.innerHTML);
	TextArea.innerHTML =text;
}
/** End of Terminal Screen Buffer **/

/** Terminal  **/
function TeleType(PII,i) 
{  
  //Clear last instance of block claret.   
  TidyClaret();
  	if(Toggle==1)
	{
			var TextArea =  document.getElementById(TerminalInputName ); 	
			if (i < PII.length) 
			{					
				//Demographics split with '|' relaced with tab
				if(PII.charAt(i) == '|')
				{
					TextArea.innerHTML += '\t';
				}
				else
				{
					//Print next char in demographic
					TextArea.innerHTML += PII.charAt(i);	
					//insert block as claret.
					TextArea.innerHTML += "█";
				}
	
				//Scroll to bottom
				TextArea.scrollTop = TextArea.scrollHeight;
				//increment the char count. 
				i++;
				//repeat (with wait) for next char. 

				setTimeout(function() {TeleType(PII,i);}, TypeSpeed );

	
			}
			else
			{
				//demographic line completed. 
	
				//stop the teletype noise 
				StopAudio();
	
				//insert a new line. 
				TextArea.innerHTML += '\n';
	
				//Repeat with new demographic data.
				setTimeout(function (){ PrintTerminalData(); },1500);
			}
  	}
	else
	{
		//Power is off
		ClearTerminal();
	}
}

function TidyClaret()
{
	//find the last instance of the block char and remove it. 
	var TextArea =  document.getElementById(TerminalInputName); 
	TextArea.innerHTML = TextArea.innerHTML.replace(/█$/, "") + "";
}

function ClearTerminal()
{
	//Power Is Off 
	//Stop Audio
	StopAudio();
	//Remove Existing Data
	var TextArea =  document.getElementById(TerminalInputName); 
	TextArea.innerHTML = "";
}

/** End of Terminal **/

/** Patient Demographics**/
function GetPatientName()
{
	/** Create a random patient name LAST, FIRST **/	
	var GIVENNAMES = ["James", "Aaron", "Abigail", "Adam", "Alan", "Albert", "Alexander", "Alexis", "Alice", "Amanda", "Amber", "Amy", "Andrea", "Andrew", "Angela", "Ann", "Anna", "Anthony", "Arthur", "Ashley", "Austin", "Barbara", "Benjamin", "Betty", "Beverly", "Billy", "Bobby", "Bradley", "Brandon", "Brenda", "Brian", "Brittany", "Bruce", "Bryan", "Carl", "Carol", "Carolyn", "Catherine", "Charles", "Cheryl", "Christian", "Christina", "Christine", "Christopher", "Cynthia", "Daniel", "Danielle", "David", "Deborah", "Debra", "Denise", "Dennis", "Diana", "Diane", "Donald", "Donna", "Doris", "Dorothy", "Douglas", "Dylan", "Edward", "Elizabeth", "Emily", "Emma", "Eric", "Ethan", "Eugene", "Evelyn", "Frances", "Frank", "Gabriel", "Gary", "George", "Gerald", "Gloria", "Grace", "Gregory", "Hannah", "Harold", "Heather", "Helen", "Henry", "Jack", "Jacob", "Jacqueline", "Jane", "Janet", "Janice", "Jason", "Jean", "Jeffrey", "Jennifer", "Jeremy", "Jerry", "Jesse", "Jessica", "Joan", "Joe", "John", "Johnny", "Jonathan", "Jordan", "Jose", "Joseph", "Joshua", "Joyce", "Juan", "Judith", "Judy", "Julia", "Julie", "Justin", "Karen", "Katherine", "Kathleen", "Kathryn", "Kayla", "Keith", "Kelly", "Kenneth", "Kevin", "Kimberly", "Kyle", "Larry", "Laura", "Lauren", "Lawrence", "Linda", "Lisa", "Logan", "Lori", "Louis", "Madison", "Margaret", "Maria", "Marie", "Marilyn", "Mark", "Martha", "Mary", "Matthew", "Megan", "Melissa", "Michael", "Michelle", "Nancy", "Natalie", "Nathan", "Nicholas", "Nicole", "Noah", "Olivia", "Pamela", "Patricia", "Patrick", "Paul", "Peter", "Philip", "Rachel", "Ralph", "Randy", "Raymond", "Rebecca", "Richard", "Robert", "Roger", "Ronald", "Rose", "Roy", "Russell", "Ruth", "Ryan", "Samantha", "Samuel", "Sandra", "Sara", "Sarah", "Scott", "Sean", "Sharon", "Shirley", "Sophia", "Stephanie", "Stephen", "Steven", "Susan", "Teresa", "Terry", "Theresa", "Thomas", "Timothy", "Tyler", "Victoria", "Vincent", "Virginia", "Walter", "Wayne", "William", "Willie", "Zachary" ];
	var SURNAMES = ["SMITH", "JOHNSON", "WILLIAMS", "JONES", "BROWN", "DAVIS", "MILLER", "WILSON", "MOORE", "TAYLOR", "ANDERSON", "THOMAS", "JACKSON", "WHITE", "HARRIS", "MARTIN", "THOMPSON", "GARCIA", "MARTINEZ", "ROBINSON", "CLARK", "RODRIGUEZ", "LEWIS", "LEE", "WALKER", "HALL", "ALLEN", "YOUNG", "HERNANDEZ", "KING", "WRIGHT", "LOPEZ", "HILL", "SCOTT", "GREEN", "ADAMS", "BAKER", "GONZALEZ", "NELSON", "CARTER", "MITCHELL", "PEREZ", "ROBERTS", "TURNER", "PHILLIPS", "CAMPBELL", "PARKER", "EVANS", "EDWARDS", "COLLINS", "STEWART", "SANCHEZ", "MORRIS", "ROGERS", "REED", "COOK", "MORGAN", "BELL", "MURPHY", "BAILEY", "RIVERA", "COOPER", "RICHARDSON", "COX", "HOWARD", "WARD", "TORRES", "PETERSON", "GRAY", "RAMIREZ", "JAMES", "WATSON", "BROOKS", "KELLY", "SANDERS", "PRICE", "BENNETT", "WOOD", "BARNES", "ROSS", "HENDERSON", "COLEMAN", "JENKINS", "PERRY", "POWELL", "LONG", "PATTERSON", "HUGHES", "FLORES", "WASHINGTON", "BUTLER", "SIMMONS", "FOSTER", "GONZALES", "BRYANT", "ALEXANDER", "RUSSELL", "GRIFFIN", "DIAZ", "HAYES", "MYERS", "FORD", "HAMILTON", "GRAHAM", "SULLIVAN", "WALLACE", "WOODS", "COLE", "WEST", "JORDAN", "OWENS", "REYNOLDS", "FISHER", "ELLIS", "HARRISON", "GIBSON", "MCDONALD", "CRUZ", "MARSHALL", "ORTIZ", "GOMEZ", "MURRAY", "FREEMAN", "WELLS", "WEBB", "SIMPSON", "STEVENS", "TUCKER", "PORTER", "HUNTER", "HICKS", "CRAWFORD", "HENRY", "BOYD", "MASON", "MORALES", "KENNEDY", "WARREN", "DIXON", "RAMOS", "REYES", "BURNS", "GORDON", "SHAW", "HOLMES", "RICE", "ROBERTSON", "HUNT", "BLACK", "DANIELS", "PALMER", "MILLS", "NICHOLS", "GRANT", "KNIGHT", "FERGUSON", "ROSE", "STONE", "HAWKINS", "DUNN", "PERKINS", "HUDSON", "SPENCER", "GARDNER", "STEPHENS", "PAYNE", "PIERCE", "BERRY", "MATTHEWS", "ARNOLD", "WAGNER", "WILLIS", "RAY", "WATKINS", "OLSON", "CARROLL", "DUNCAN", "SNYDER", "HART", "CUNNINGHAM", "BRADLEY", "LANE", "ANDREWS", "RUIZ", "HARPER", "FOX", "RILEY", "ARMSTRONG", "CARPENTER", "WEAVER", "GREENE", "LAWRENCE", "ELLIOTT", "CHAVEZ", "SIMS", "AUSTIN", "PETERS", "KELLEY", "FRANKLIN", "LAWSON", "FIELDS", "GUTIERREZ", "RYAN", "SCHMIDT", "CARR", "VASQUEZ", "CASTILLO", "WHEELER", "CHAPMAN", "OLIVER", "MONTGOMERY", "RICHARDS", "WILLIAMSON", "JOHNSTON", "BANKS", "MEYER"];
	var genName ="";
	const FIRSTNAME = GIVENNAMES[Math.floor(Math.random() * GIVENNAMES.length)];
	const SURNAME = SURNAMES[Math.floor(Math.random() * SURNAMES.length)];
	return genName.concat(SURNAME,", ",FIRSTNAME);
}

function GetPatientNameBasedOnDisney()
{
	/** Create a random patient name LAST, FIRST **/	
	var DISNEYNAME = ["MOUSE, Mickey", "MOUSE, Mini", "DUCK, Donald", "DUCK, Daisy", "POTTS, Chip", "HOOD, Robin", "PATIENT, Fake", "PATIENT, NoReal","DOGG, Goofey"];
	return DISNEYNAME[Math.floor(Math.random() * DISNEYNAME.length)];
}

function GetPatientNHSNumber()
{
	/** Creates out NHS number in ### ### ### format **/
	var NHSNumber = ""	
	var NHSNumber = NHSNumber.concat(GetRandomNumber(0,999).toString().padStart(3, "0")," ", GetRandomNumber(0,999).toString().padStart(3, "0")," ",GetRandomNumber(0,999).toString().padStart(3, "0"));
	return NHSNumber;
}

function  GetPatientDOB(start, end) 
{
	/** Create a random date of birth for the patiebt **/
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

 function GetPatientAge(PatientDOB) 
 {
   /** Get patient age from the random date of birth created **/
   var ageDifMs = Date.now() - PatientDOB;
   var ageDate = new Date(ageDifMs); 
   return Math.abs(ageDate.getUTCFullYear() - 1970).toString().padStart(2, "0");
 }

function GetRandomNumber(min, max) 
{
	/** Get a random number **/
  	var num = Math.floor(Math.random() * (max - min)) + min;
	return num
}

function GetDateOfBirthAsString(PatientDOB)
{
	/** Return the patient DOB as dd/MM/yyyy.  **/
	var dd = PatientDOB.getDate(); 
	var mm = PatientDOB.getMonth() + 1; 	
	var yyyy = PatientDOB.getFullYear(); 
    return  dd.toString().padStart(2, "0") + '/' + mm.toString().padStart(2, "0") + '/' + yyyy; 
}

function FakePatientRecord()
{
	/** Creates our demographic data to be printed.  **/	
	var record = "";
	//Patient Name
	var name = GetPatientName().padEnd(20, ' '); // GetPatientNameBasedOnDisney().padEnd(20, ' ');
	//Patient NHS Number
	var NHS = GetPatientNHSNumber();
	//Patient Hospital Number 
	var Hosptal = "R"+ GetRandomNumber(0,999999).toString().padStart(6, "0")
	//Patient Random data of birth between NOW and 1940. 
	var DateOfBirth = GetPatientDOB(new Date(1940, 0, 1), new Date())
	//Patient age from random date of birth. 
	var Age = GetPatientAge(DateOfBirth);	
	//Patient Date of Birth as dd/MM/yyyy
    var DateOfBirthAsString =GetDateOfBirthAsString(DateOfBirth)
	//Record Delimiter
	var blank = "|"	
	
	return record.concat(name,blank,DateOfBirthAsString,blank,Age,blank,NHS,blank,Hosptal);	
}
/** End of Patient Demographics**/

/** MAIN **/

//PowerState Variabe 
var Toggle =1;

function PowerSwitch(){
	
	if(Toggle ==1) 
	{	
		//Switch Power off
		Toggle=0;
		//Change the power icon
		document.getElementById("PowerBTN").src = "Data/Images/Terminal/TerminalPowerOff.png"; 
		//Remove Green Screen
		document.getElementById("terminal-output").className = "noselect TerminalOff";
		//Remove the text
		ClearTerminal();
	} 
	else 
	{
		//Switch Power On
		Toggle = 1;
		//Change the power icon
		var pwr = document.getElementById("PowerBTN").src = "Data/Images/Terminal/TerminalPower.png"; 
		//Re-add Green Screen
		document.getElementById("terminal-output").className = "noselect TerminalOn";
		//Start Typing 
		PrintTerminalData();
	}

}

function PrintTerminalData()
{
	if(Toggle ==1)
	{
		//irritating noise from Red October. 
		playAudio();
		//Generate new patient demographic and begin tele true
		TeleType(FakePatientRecord(),0);  	
		//Check textarea space. 
		TextAreaTrim();
	}
	else
	{
		
	}
}

/** END **/

