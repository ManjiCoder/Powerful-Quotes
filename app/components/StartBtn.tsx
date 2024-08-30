'use client';
export default function StartBtn() {
  const setStartDate = () => {
    console.log('clk');
    localStorage.setItem('startDate', new Date().getTime().toString());
  };
  return (
    <button
      type="button"
      className="invisible relative bottom-20 z-50 cursor-pointer bg-white text-lg text-black font-semibold px-5 py-1 rounded-lg"
      onClick={setStartDate}
    >
      Start
    </button>
  );
}
