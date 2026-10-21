import { merchandise } from "../../data/merchandise";

export default function MerchList() {
  return (
    <div>
      {merchandise.map((entity) => (
        <section key={entity.code}>
          <h2>{entity.code} Merchandise {entity.event && `- Event: ${entity.event}`}</h2>

          {entity.items.length === 0 && <p>None</p>}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {entity.items.map((item) => (
              <div key={item.id} className="border rounded-lg p-3">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
                <h3>{item.name}</h3>
                {item.limitedSupply && <span>Limited Supply</span>}
                <p>Colors: {item.colors.join(", ")}</p>
                {item.sizes && <p>Sizes: {item.sizes.join(", ")}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}