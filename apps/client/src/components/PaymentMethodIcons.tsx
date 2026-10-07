import {
  siAmericanexpress,
  siDiscover,
  siMastercard,
  siVisa,
} from "simple-icons";

const paymentBrands = [siVisa, siMastercard, siAmericanexpress, siDiscover];

const PaymentMethodIcons = () => (
  <div className="flex flex-col gap-2" aria-label="Accepted payment methods">
    <p className="text-sm font-medium text-(--muted)">Accepted cards</p>
    <ul className="flex flex-wrap items-center gap-2">
      {paymentBrands.map((brand) => (
        <li
          key={brand.slug}
          title={brand.title}
          className="flex h-9 w-14 items-center justify-center rounded border border-(--line) bg-(--surface) px-2"
        >
          <svg
            role="img"
            aria-label={brand.title}
            viewBox="0 0 24 24"
            className="h-5 w-auto max-w-10"
            fill={`#${brand.hex}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d={brand.path} />
          </svg>
        </li>
      ))}
    </ul>
  </div>
);

export default PaymentMethodIcons;