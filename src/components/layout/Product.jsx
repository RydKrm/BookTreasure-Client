import Image from "./Image";
import Badge from "./Badge";
import Flex from "./Flex";
import { AiFillHeart } from "react-icons/ai";
import { BiSolidCart } from "react-icons/bi";
import useUserInfo from '../../CustomHook/useUserInfo';
import axios from "axios";
import Swal from "sweetalert2";

const Product = ({ item}) => {

  const { userId } = useUserInfo();

  const addToCart = ()=>{
      const data = {
        userId:userId,
        productId: item._id,
      }
      axios.post('http://localhost:5000/addToCart',data)
      .then(res=>{
        if(res.data.status){
          Swal.fire({
              icon:'success',
              title:'Add to Cart',
              text:'Book Added to Cart, Now you can order from cart',
              timer:700
          })
        } else {
        Swal.fire({
              icon:'error',
              title:'Product not added to cart',
              text:'Somthing Wrong happend here',
              timer:700
          })
        }
      })
      .catch(err=>console.log(err));


  }


  return (
    <div key={item?.bookName} className="md:w-[49%] lg:w-[32%] mb-6">
      <div className="group relative overflow-y-hidden">
        <Image className="w-[370px] h-[370px]" imgsrc={item?.image} /> 
        
        {item?.bookType && <Badge title={item?.bookType} />}
        <div className="h-40 bg-white absolute bottom-[-44%] group-hover:bottom-0 left-0 w-full py-6 px-7 ">
          <Flex className="flex justify-end items-center gap-x-1 sm:gap-x-4">
            <button className="font-regular font-dm text-base text-[#6d6d6d]">
              Add to Wish List</button>
            <AiFillHeart className="text-base" />
          </Flex>
          <Flex className="flex justify-end items-center gap-x-1 sm:gap-x-4 mt-5">
            <button  onClick={addToCart} className="font-regular font-dm text-base text-[#6d6d6d]">
              Add to Cart
            </button>
            <BiSolidCart className="text-base" />
          </Flex>
        </div>
      </div>
      <div className="mb-12 md:mb-0">
        <Flex className="flex justify-between mt-0 md:mt-6">
          <h3 className="font-dm text-xl font-bold">{item?.bookName}</h3>
          <p className="font-dm text-base font-regular text-[#767676]">${item?.price}</p>
        </Flex>
        <p className="font-dm text-base font-regular text-[#767676] mt-1 md:mt-4">
          {item?.bookAuthor}
        </p>
        <p className="font-dm text-base font-regular text-[#767676] mt-1 md:mt-4">
          Category: {item?.category}
        </p>
        <p className="font-dm text-base font-regular text-[#767676] mt-1 md:mt-4">
          Quntity: {item?.bookQuantity}
        </p>
      </div>
    </div>
  );
};

export default Product;