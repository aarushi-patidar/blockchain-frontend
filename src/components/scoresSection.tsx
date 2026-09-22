
export default function SaveScores() {

  return (
    <section className="w-full h-screen relative py-20 overflow-hidden bg-black">
      <div className="w-full h-full">
        

        <div className="h-screen absolute z-12 bg-linear-to-b from-black via-black/90 to-transparent -translate-y-70 w-full"></div>

        <img src="gradient.png" alt=""  className="absolute top-10 z-11 right-0"/>
        <img src="gradient.png" alt=""  className="absolute bottom-0 z-11 left-0 rotate-180"/>

        <img src="score.svg" alt=""  className="absolute left-[50%] -translate-x-[50%] translate-y-[30%] scale-60 z-15 bottom-[50%]"/>
        
        
        
      </div>
      <footer className="absolute border-t-1 flex items-center -bottom-5 scale-x-110 bg-linear-to-t from-black via-black/70 to-transparent left-10 z-12 bg-black-70 w-full h-50">
            <div className=" -translate-y-10 -translate-x-25 scale-x-70">
                <Scroller />
            </div>
            <div className="scale-x-90">
                <img src="icon.svg" alt="" />
            </div>
        </footer>
      
    </section>
    
  );
}

const Scroller = () => {
  return (
    <div className="scroller mt-20 hover:text-gray-200">
                <div className="scroller-in ">
                    <h4 className="italic">VOLTAGE</h4>
                    <h4 className="italic">CHAIN</h4>
                </div>
    </div>
  )
}
