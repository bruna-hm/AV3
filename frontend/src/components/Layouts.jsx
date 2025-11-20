import { useLocation } from "react-router-dom";
import MainNav, { AeronaveNavbar } from "./Navbars";

export default function LayoutNavbars({ usuario }) {
    const location = useLocation();
    const path = location.pathname;

    const parts = path.split("/").filter(Boolean);
    let aeronaveCodigo = null;
    let voltarPara = "/";

    if (parts[0] === "aeronaves") {
        if (parts.length === 1) {
            voltarPara = "/";
        } else if (parts.length === 2) {
            aeronaveCodigo = parts[1];
            voltarPara = "/";
        } else if (parts.length > 2) {
            aeronaveCodigo = parts[1];
            voltarPara = `/aeronaves/${aeronaveCodigo}`;
        }
    }

    const isDetalheAeronave = parts[0] === "aeronaves" && parts.length > 1 && parts[1] !== "adicionar";;

    return (
        <>
            {isDetalheAeronave ? (
                <AeronaveNavbar aeronaveCodigo={aeronaveCodigo} voltarPara={voltarPara} />
            ) : (
                <MainNav usuario={usuario} />
            )}
        </>
    );
}
