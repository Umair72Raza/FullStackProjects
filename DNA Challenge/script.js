// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single strand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  let pAequorFactory = (numDiffer, arraFifBase) => {
    return{
      specimenNum: numDiffer,
      dna:arraFifBase,
      mutate(){
        let mutatedbase = this.dna;
        let randSelectedBase = this.dna[Math.floor(Math.random()*15)];
        let index = this.dna.indexOf(randSelectedBase);
        //console.log('randSelectedBase'+randSelectedBase)
        //console.log(this.dna);
        //console.log('this should be changed' + index);
        let replacer = randSelectedBase;
        while(replacer===randSelectedBase){
            replacer = returnRandBase();
            //console.log('replacer:'+replacer);
        }
  
        mutatedbase[index] = replacer;
        return mutatedbase;
      },//mutate ends
      compareDNA (otherP){ 
        myDNA = this.dna;
        otherDNA = otherP.dna;
        console.log(myDNA+ "     "+otherDNA)
        let similarity = [];
        for(let i=0;i<myDNA.length;i++)
        {
          if(myDNA[i]===otherDNA[i])
          {
            similarity.push(myDNA[i]);
          }
          else{
  
          }
  
        }
        //console.log("Similar bases "+similarity)
        let percent = (similarity.length/myDNA.length)*100;
        return `specimen #1 and specimen #2 have ${percent}% DNA in common`
      },//endsCompareDNA
      willLikelySurvive(){
        let CandG =[];
        myDNA = this.dna;
        myDNA.forEach(element=>{(element==='C'||element==='G') ? CandG.push(element):null })
        //return("will survive "+CandG+"%")
        
        const isLength60PercentOrMore = CandG.length / myDNA.length >= 0.6;
  
         //console.log(isLength60PercentOrMore ? "Will likely Survive": "Chances are too low" ); 
         return isLength60PercentOrMore  
  
           }//likey survive ends 
    }
  }
  
  
  
  let Dna = mockUpStrand();
  let organism = pAequorFactory(1,Dna);
  let Dna2 = mockUpStrand();
  let organism2 = pAequorFactory(2,Dna2)
  //console.log(organism.mutate())
  //console.log(organism.compareDNA(organism2))
  //console.log(organism)
  //console.log(organism2)
  //console.log(organism.willLikelySurvive())
  
  const objectInstances = [];
  
  while (objectInstances.length < 30) {
    let numDiffer = Math.floor(Math.random() * 1000);
    let Dna = mockUpStrand();
    const newOrg = pAequorFactory(numDiffer, Dna);
  
    // Check if the organism will likely survive before adding it to objectInstances
    if (newOrg.willLikelySurvive()) {
      objectInstances.push(newOrg);
    }
  }
  
  console.log(objectInstances);
  