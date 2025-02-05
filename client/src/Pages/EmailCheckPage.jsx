import { NavLink } from "react-router-dom";
export const EmailCheckPage = () => {
  return (
    <div className="w-screen">
      <div className="container flex flex-col items-center mt-24 gap-4   text-green-900 text-lg max-sm:text-sm max-sm:px-14 mx-auto w-3/5">
        <h2 className=" text-3xl mb-5 text-lime-950 max-sm:text-lg">
          Bitte prüffen Sie Ihre Email
        </h2>

        <p className="text-xl max-sm:text-sm">
          Dein Passwort-Zurücksetzungslink ist <b>nur 2 Minuten</b> gültig.
          Bitte setze dein Passwort so schnell wie möglich zurück. Falls der
          Link abgelaufen ist, fordere einfach einen neuen an.
        </p>

        <p>
          {" "}
          Falls du die E-Mail nicht findest, schau bitte im Spam-Ordner nach.
        </p>

        <button className=" mt-10 drop-shadow-lg  py-1 rounded bg-teal-500  text-white sm:hover:bg-teal-900 w-24">
          <NavLink to="/home">Home</NavLink>
        </button>
      </div>
    </div>
  );
};
