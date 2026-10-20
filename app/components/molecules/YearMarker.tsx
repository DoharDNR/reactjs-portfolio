// ===== Molecule: YearMarker =====
// Year heading with repository count, used in timeline

type YearMarkerProps = {
  year: number;
  repoCount: number;
  headingColor: string;
  bodyColor: string;
};

export function YearMarker({ year, repoCount, headingColor, bodyColor }: YearMarkerProps) {
  return (
    <div className="ml-5">
      <h2 className={`text-2xl font-semibold tracking-tight ${headingColor}`}>
        {year}
      </h2>
      <p className={`mt-1 text-sm ${bodyColor}`}>
        {repoCount === 1 ? "1 repository" : `${repoCount} repositories`}
      </p>
    </div>
  );
}
