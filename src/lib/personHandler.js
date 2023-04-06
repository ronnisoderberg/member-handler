export function personnummerLogik(nummer) {
  let unformatted = nummer;
  let nrString = nummer.toString();
  nrString = nrString.replace("-", "");
  let fyraSista = nrString.slice(-4);

  if (nrString.length != 6 && 8) {
    let fodelseNR = nrString.slice(0, nrString.length - 4).toString();

    if (fodelseNR.length === 8) {
      // input = fodelseNR + fyraSista;
      return fodelseNR + fyraSista;
    } else if (fodelseNR.length === 6) {
      fodelseNR = fodelseNR.replace(/(\d{2})(\d{2})(\d{2})/, "$1-$2-$3");
      let thisYearFirsttwoLetters = new Date()
        .getFullYear()
        .toString()
        .slice(0, 2);

      if (Date.parse(thisYearFirsttwoLetters + fodelseNR) > Date.now()) {
        let datumEttSekelTidigare = (new Date().getFullYear() - 100)
          .toString()
          .slice(0, 2);

        return (datumEttSekelTidigare + fodelseNR + fyraSista).replaceAll(
          "-",
          ""
        );
      } else {
        return (thisYearFirsttwoLetters + fodelseNR + fyraSista).replaceAll(
          "-",
          ""
        );
      }
    }
  } else {
    return unformatted;
  }
}
