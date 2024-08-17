import { shortenString } from "@utils/shoringString";

interface IInfo {
  infoKey: string;
  infoValue: string | number | undefined;
}

export const Info: React.FC<IInfo> = ({ infoKey, infoValue }) => {
  return (
    <div className="text-[8px] mt-[8px] text-ellipsis overflow-hidden w-full">
      <span className="font-bold">{infoKey}:</span>
      <span className="ml-[5px]">{shortenString(String(infoValue), 30)}</span>
    </div>
  );
};
