import { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
} from "@heroui/react";
import React from "react";
import TeamLogo from "../components/team-logo.jsx";

// Mapeo de posiciones a español
const positionMap = {
  forward: "Delantero",
  midfielder: "Centrocampista",
  defender: "Defensa",
  goalkeeper: "Portero",
};

function TeamModal({ team }) {
  const { store, actions } = useContext(Context);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [teamDetails, setTeamDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const setTeamProfile = async () => {
    setIsLoading(true);
    onOpenChange(true);
    await actions.getTeamProfile(team.id);
    setTeamDetails(store.teamProfile);
    setIsLoading(false);
  };

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        onPress={() => setTeamProfile()}
        className="w-full h-full"
      >
        <TeamLogo teamId={team.id} />
      </Button>

      <Modal
        isOpen={isOpen}
        backdrop="blur"
        onOpenChange={onOpenChange}
        className="bg-background/90"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center gap-2">
                <TeamLogo teamId={team.id} />
                <h1 className="text-xl font-bold">{team.name}</h1>
              </ModalHeader>

              <ModalBody>
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <Spinner size="xl" />
                  </div>
                ) : (
                  <div>
                    <p>
                      <strong>Estadio:</strong> {teamDetails?.venue?.name} (
                      {teamDetails?.venue?.city_name},{" "}
                      {teamDetails?.venue?.country_name})
                    </p>
                    <p>
                      <strong>Capacidad del Estadio:</strong>{" "}
                      {teamDetails?.venue?.capacity}
                    </p>
                    <p>
                      <strong>D.T.:</strong> {teamDetails?.manager?.name} (
                      {teamDetails?.manager?.nationality})
                    </p>
                    <p>
                      <strong>Jugadores:</strong>
                    </p>
                    <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                      <ul>
                        {teamDetails?.players?.map((player, index) => (
                          <li key={index} className="my-2">
                            <p>
                              <strong>{player?.name}</strong> -{" "}
                              {positionMap[player?.type] || player?.type}
                            </p>
                            <p>
                              <strong>Número:</strong> {player?.jersey_number}
                            </p>
                            <p>
                              <strong>Edad:</strong>{" "}
                              {new Date().getFullYear() -
                                new Date(player?.date_of_birth).getFullYear()}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default TeamModal;
