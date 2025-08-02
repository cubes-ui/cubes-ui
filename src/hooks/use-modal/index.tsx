import { ReactNode, useState } from "react";
import { Modal } from "../../components/modal";
import { ModalState } from "../../components/modal/modal.type";

export const useModal = () => {
  const [modal, setModal] = useState<ModalState | null>(null);

  const openModal = ({
    content,
    config,
  }: {
    content: ReactNode;
    config?: ModalState["config"];
  }) => setModal({ content, config });

  const closeModal = () => setModal(null);

  return {
    Modal: ({
      closeWithClickOutside = true,
      className,
      title,
    }: {
      title?: { title: string; icon?: ReactNode };
      closeWithClickOutside?: boolean;
      className?: string;
    }) => (
      <Modal
        title={title}
        closeModal={closeModal}
        open={!!modal?.content}
        className={className}
        closeWithClickOutside={closeWithClickOutside}
        {...modal?.config}
      >
        {modal?.content}
      </Modal>
    ),
    openModal,
    closeModal,
    isModalOpen: !!modal,
  };
};
