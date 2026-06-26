import { Layers } from "lucide-react";
import { MULTIBUY_TIERS } from "@/lib/multibuy";

const gbp = (n: number) => `£${n.toFixed(2)}`;

interface Props {
  unitPrice: number;
}

const MultibuyTiers = ({ unitPrice }: Props) => {
  if (!unitPrice) return null;
  const tiers = [...MULTIBUY_TIERS].reverse();
  return (
    <div className="border border-border rounded-lg p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Layers className="w-4 h-4 text-primary" />
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
          Buy more, save more
        </span>
      </div>
      <ul className="grid grid-cols-3 gap-2">
        {tiers.map((t) => {
          const lineTotal = unitPrice * t.minQty;
          const saved = lineTotal * t.discount;
          return (
            <li
              key={t.minQty}
              className="flex flex-col items-start gap-1 rounded-md bg-secondary/60 p-2.5"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                {t.minQty === 4 ? "4+" : t.minQty}
              </span>
              <span className="text-xs font-semibold text-foreground">
                {Math.round(t.discount * 100)}% off
              </span>
              <span className="text-[10px] text-muted-foreground">
                Save {gbp(saved)}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="text-[10px] text-muted-foreground">
        Discount applied automatically in your basket. Stacks across mixed
        flavours and sizes of the same product.
      </p>
    </div>
  );
};

export default MultibuyTiers;
