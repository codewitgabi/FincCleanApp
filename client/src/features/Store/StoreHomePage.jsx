import AddCustomerModal from "./Customer/AddCustomerModal";
import CustomerOrderInfo from "./Customer/CustomerOrderInfo";
import StoreSection from "./StoreSection";
import WeightProductModal from "./Product/WeightProductModal";
import SectionNav from "./Product/SectionNav";
import PaymentMethodModal from "./Order/PaymentMethodModal";

const StoreHomePage = () => {
  return (
    <>
      <section className="px-4 h-full text-sm md:text-base bg-gradient-to-b overflow-y-auto from-gray-100 via-blue-50 to-blue-100">
        <div className="h-full leading-loose flex flex-col pt-2 pb-2">
          <SectionNav />
          <div className="grid grid-cols-12 gap-4 h-full">
            <div className="col-span-12 md:col-span-8 h-full">
              <StoreSection />
            </div>
            <div className="col-span-12 md:col-span-4 h-full">
              <CustomerOrderInfo />
            </div>
          </div>
        </div>
      </section>
      <WeightProductModal />
      <AddCustomerModal />
      <PaymentMethodModal />
    </>
  );
};

export default StoreHomePage;
