interface Props {
  options: string[];
  selected: string | undefined;
  selectOption: (newSelected: string) => void;
}

export default function MultiButton({
  options,
  selectOption,
  selected,
}: Props) {
  return (
    <div className="flex justify-center">
      {options.map((option, index) => (
        <button
          className={`p-3 border-2 ${
            option === selected ? "border-white" : "border-gray-500"
          } ${index === 0 ? "rounded-l-lg" : ""} ${
            index === options.length - 1 ? "rounded-r-lg" : ""
          }`}
          key={option}
          onClick={(e) => selectOption(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
