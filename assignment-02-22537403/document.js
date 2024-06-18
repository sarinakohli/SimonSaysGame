document.addEventListener('DOMContentLoaded', function() {

    //all initial varaibles
    let sequence  = [];
    let inputSequence = [];
    let level;
    let lightOn = false;
    let highscore = 0;
    let correctLevels = 0;
    let timerInterval;
    const button1 = document.querySelector("#button1");
    const button2 = document.querySelector("#button2");
    const button3 = document.querySelector("#button3");
    const button4 = document.querySelector("#button4");
    const startButton = document.getElementById('start').addEventListener('click', start);
    startButton;
    const buttons = [button1, button2, button3, button4];
    
    // activity of start button onclick
    function start()
    {
        //all variables start at 0
        sequence = [];
        inputSequence = [];
        level = 0;
        highscore = 0;
        correctLevels = 0;
        light(true);    //status light turns on
        setTimeout(Simon, 3000);   //simons sequence commences after 3 seconds
    }
    
    //switching status light on (changing color of light css)
    function light(bool)
    {
        lightOn = bool;
        var color = document.getElementById("light");
        if(color.style.backgroundColor === 'rgb(14,199,38)')
        {
            color = color.style.backgroundColor = 'red';
        }
        else
        {
            color = color.style.backgroundColor = 'rgb(14,199,38)';
        }
    }
    
    //random sequence from simon
    function Simon()
    {
        for(let i = 0; i <= level; i++)   //for loop picks random index our of 4 buttons while on level
        {
            let randomIndex = Math.floor(Math.random() * buttons.length);   //random index based on amount of buttons
            sequence.push(randomIndex);  //random index is places/pushed onto sequenece array
        }
        sequenceFlash();  //display of sequence is called
    } 
    
    //display of random sequence 
    function sequenceFlash()
    {
        sequence.forEach((colorCode, index) => 
        {
            setTimeout(() => 
            {
                const button = buttons[colorCode];
                button.disabled = true;
                button.classList.add('highlight');
                
                setTimeout(() => {
                    button.classList.remove('highlight');
                    button.disabled = false;
                    startTimer();
                }, speedUp() / 2);
            }, speedUp() * index);
        });
        buttons.forEach(function(button) 
        {
            button.addEventListener('click', handleClick);  
        });
    }

    //handles user input 
    function handleClick(event)
    {
        if(!lightOn) return;
        const clickedButton = event.target;
        const buttonIndex = buttons.indexOf(clickedButton);
        inputSequence.push(buttonIndex);
    
        const lastIndex = inputSequence.length - 1;
        if (inputSequence[lastIndex] !== sequence[lastIndex])
         {
            indicateFail();
            reset();
            return;
        }
        if (inputSequence.length === sequence.length) 
        {
            levelUp();
        }
    }

    //resets game after failed attempt
    function reset()
    {
        light(false);
        score();
        sequence = [];
        inputSequence = [];
        level = 0;
        correctLevels = 0;
        updateCounters();
        clearTimeout(timerInterval);
        var color = document.getElementById("light");
        if(color.style.backgroundColor === 'red')
        {
            color = color.style.backgroundColor = 'rgb(14,199,38)';
        }
        else
        {
            color = color.style.backgroundColor = 'red';
        }
    }

    //increases level and adds extra flash to sequence every time
    function levelUp()
    {
        inputSequence = [];
        level++; 
        sequence.push(Math.floor(Math.random() * buttons.length));
        sequenceFlash();
        correctLevels++;
        updateCounters();
        startTimer();
    }

    //tracks highscore and diplays on panel
    function score()
    {
        var lastScore = level;
        if(lastScore > highscore)
        {
            highscore = lastScore;
            document.getElementById('counterLeft').innerHTML = highscore;
        }
    }

    //updates counters as levels go up 
    function updateCounters()
    {
        document.getElementById('counterLeft').innerHTML = highscore;
        document.getElementById('counterRight').innerHTML = correctLevels;
    }

    //calls flash method once there is a failed attempt 
    function indicateFail() 
    {
        score();
        flashButtons(5); 
        reset();
    }

    //flashes buttons 5 times
    function flashButtons(times) 
    {
        for (let i = 0; i < times; i++) 
        {
            setTimeout(() => {
                buttons.forEach(button => 
                    {
                    button.classList.add('highlight');
                    setTimeout(() => 
                    {
                        button.classList.remove('highlight');
                    }, 200);
                });
            }, i * 400);
        }
    }

    //speeds up sequence flash after every 5th, 9th and 13th level
    function speedUp()
    {
        if(level < 5) 
        {
            return 1000;
        }
        else if(level < 9)
        {
            return 800;
        }
        else if(level < 13)
        {
            return 600;
        }
        else
        {
            return 400;
        }
    }
    
    //starts 5 second knock out timer
    function startTimer()
    {
        clearTimeout(timerInterval);
        timerInterval = setTimeout(() => 
        {
            indicateFail();
        }, 5000);
    }
    });