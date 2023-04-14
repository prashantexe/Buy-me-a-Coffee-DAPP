import { ConnectWallet, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { Container,Box,Text,Flex,SimpleGrid } from "@chakra-ui/react";


const Home: NextPage = () => {

  const address = useAddress();
  const contractAddress = "0xF84C00c2210e439f6454F6773C5c21660384A94E";

  const {contract} = useContract(contractAddress);

  const { data: totalCoffees, isLoading: loadingTotalCoffee} = useContractRead(contract, "getTotalCofee");
  const { data: recentCoffees, isLoading: loadingRecentCoffee} = useContractRead(contract, "getAllCofee");

  return (
   <Container maxW={"1200px"} w={"full"}>
    <Flex justifyContent={"space-between"} alignItems ={"center"} py={"20px"} height={"80px"}>
      <Box>
        <Text fontWeight={"bold"}> Buy me a Coffee</Text>
      </Box>
      <ConnectWallet />
    </Flex>
    <SimpleGrid columns= {2} spacing={10} mt={"40px"}>

    </SimpleGrid>
   </Container>
  );
};

export default Home;
 