import { ConnectWallet, Web3Button, useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { Container,Box,Text,Flex,SimpleGrid,Card,CardBody,Input, Heading,Skeleton, Stack  } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useState } from "react";

const Home: NextPage = () => {

  const address = useAddress();
  const contractAddress = "0xF84C00c2210e439f6454F6773C5c21660384A94E";

  const {contract} = useContract(contractAddress);

  const { data: totalCoffees, isLoading: loadingTotalCoffee} = useContractRead(contract, "getTotalCoffee");
  const { data: recentCoffees, isLoading: loadingRecentCoffee} = useContractRead(contract, "getAllCoffee");

  const [messgae, setMessage] = useState<string>("");
  const [name, setName] = useState<string> ("");

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };
  
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setName(event.target.value);
  };
  

  function clearValues(){
    setMessage("");
    setName("");
  }

  return (
   <Container maxW={"1200px"} w={"full"}>
    <Flex justifyContent={"space-between"} alignItems ={"center"} py={"20px"} height={"80px"}>
      <Box>
        <Text fontWeight={"bold"}> Buy me a Coffee</Text>
      </Box>
      <ConnectWallet />
    </Flex>
    <SimpleGrid columns= {2} spacing={10} mt={"40px"}>
    <Box>
      <Card>
        <CardBody>
          <Heading mb={"20px"}>Buy me a Coffee</Heading>
          <Flex direction={"row"}>
            <Text>Total Coffees : </Text>
            <Skeleton isLoaded={!loadingTotalCoffee} width={"20px"} ml={"5px"}>
              {totalCoffees?.toString()}
            </Skeleton>
          </Flex>

        <Text fontSize ={"2xl"} py={"10px"}>Name:</Text>
        <Input placeholder="Lucifer" maxLength={"16"} 
        value={name} 
        onChange={handleNameChange} 
        />

        <Text fontSize ={"2xl"} py={"10px"}>Message:</Text>
        <Input placeholder="Hello Sup?" maxLength={"80"} 
        value={messgae} 
        onChange={handleMessageChange} 
        />
        <Box mt={"20px"}>
          {address ? (
            <Web3Button
              contractAddress={contractAddress}
                action={(contract) => {
                  contract.call("buyCoffee",[messgae, name], {value: ethers.utils.parseEther("0.001")})
              }}
              onSuccess={() => clearValues()}
              >{"Buy a Coffee 0.001 ETH"}</Web3Button>
          ) : (
            <Text>Please Connect to your wallet</Text>
          )}
          </Box>
        </CardBody>
      </Card>
    </Box>
    <Box>
      <Card maxH={"60vh"} overflow={"scroll"}>
            <CardBody>
                <Text fontWeight={"bold"}>Recent Messages : </Text>
                {!loadingRecentCoffee ? (
                  <Box>
                    {recentCoffees && recentCoffees.map((coffee:any, index:number) => {
                      return (
                        <Card key={index} my={"10px"}>
                          <CardBody>
                            <Text fontSize={"2xl"}>{coffee[1]}</Text>
                            <Text>From: {coffee[2]}</Text>
                          </CardBody>
                        </Card>
                      )
                    }).reverse()}
                  </Box>
                ) : (
                  <Stack>
                    <Skeleton height={"100px"} />
                    <Skeleton height={"100px"} />
                    <Skeleton height={"100px"} />
                  </Stack>
                )}
            </CardBody>
      </Card>
    </Box>
    </SimpleGrid>
   </Container>
  );
};

export default Home;
 