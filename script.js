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
// Factory function returns an object with specimenNum and dna as its properties
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate: function() {
      const index = Math.floor(Math.random() * this.dna.length);
      let currentBase = this.dna[index];
      
      let newBase = returnRandBase();
      while (newBase === currentBase) {
        newBase = returnRandBase();
      };
      this.dna = [this.dna.slice(0, index) + ','+ newBase + ','+ this.dna.slice(index + 1)];
      return this.dna;
    },
      compareDNA: function(otherOrganism) {
      let commonCount = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === otherOrganism.dna[i]) {
          commonCount++;
        }
      }
      let percentage = (commonCount / this.dna.length) * 100;
      console.log(`Specimen #${this.specimenNum} and specimen #${otherOrganism.specimenNum} have ${percentage.toFixed(2)}% DNA in common.`);
    },
    willLikelySurvive: function() {
        let cAndGCount = 0;
  for (let i = 0; i < this.dna.length; i++) {
    if (this.dna[i] === 'C' || this.dna[i] === 'G') {
      cAndGCount++;
    }
  }
  let cAndGPercentage = (cAndGCount / this.dna.length) * 100;
  return cAndGPercentage >= 60;
}
  };
};

const organism1 = pAequorFactory(1, mockUpStrand());
const organism2 = pAequorFactory(2, mockUpStrand());
console.log(organism1.willLikelySurvive());

organism1.compareDNA(organism2);

const multipleOrganisms = () => {
  const organisms = [];
  for (let i = 0; i < 30; i++) {
    const organism = pAequorFactory(i + 1, mockUpStrand());
    organisms.push(organism);
  }
  return organisms;
};

console.log(multipleOrganisms());

const organism = pAequorFactory(1, mockUpStrand());
//console.log(organism.dna); // logs the original DNA strand
organism.mutate();
//console.log(organism.dna); // logs the mutated DNA strand
console.log(organism1.willLikelySurvive());

pAequorFactory(5, mockUpStrand);
//console.log(pAequorFactory(5, mockUpStrand()));
