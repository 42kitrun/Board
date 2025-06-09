"use client";

import { useState } from "react";
import styles from "../styles/comments.module.css";

interface Comment {
  id: string;
  message: string;
  writer: string;
  writedatetime: string;
}

interface ModalProps {
  comment: Comment;
  onClose: () => void;
  onDelete: () => void;
  onEdit: (newMessage: string) => void;
}

const Modal = ({ comment, onClose, onDelete, onEdit }: ModalProps) => {
  const [editedMessage, setEditedMessage] = useState(comment.message);

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={handleModalClick}>
        <textarea
          value={editedMessage}
          onChange={(e) => setEditedMessage(e.target.value)}
          className={styles.editArea}
        />
        <div className={styles.modalActions}>
          <button onClick={onDelete}>Delete</button>
          <span></span>
          <button onClick={() => onEdit(editedMessage)}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      message: "갑상선암 항암치료종료 3년 경과.",
      writer: "센터_이영지",
      writedatetime: "2022-09-22T10:23:10+09:00",
    },
    {
      id: "2",
      message: "최근 독감에 걸림. 면역력이 낮아진 상태",
      writer: "센터_이영지",
      writedatetime: "2022-11-02T12:15:06+09:00",
    },
    {
      id: "3",
      message:
        "bmi가 비만단계로 증가.빵, 디저트 섭취 빈도가 잦음. 2일에 1번으로 줄이기로함",
      writer: "센터_송혜교",
      writedatetime: "2023-05-17T12:34:25+09:00",
    },
    {
      id: "4",
      message: "bmi 과체중 진입. 저당 디저트 제품 권장",
      writer: "센터_송혜교",
      writedatetime: "2023-08-30T10:26:12+09:00",
    },
    {
      id: "5",
      message: "식단조절 스트레스로 식욕조절이 힘듦. 고강도 유산소 운동권장",
      writer: "센터_송혜교",
      writedatetime: "2023-12-26T11:40:56+09:00",
    },
    {
      id: "6",
      message: "잘못된 운동자세로 무릎 통증 호소. 필라테스로 운동종목 전환",
      writer: "센터_송혜교",
      writedatetime: "2024-05-14T12:01:21+09:00",
    },
    {
      id: "7",
      message: "변비 발생. 식이섬유 및 탄수화물 섭취량 늘리기를 권장",
      writer: "센터_전지현",
      writedatetime: "2024-07-16T11:50:11+09:00",
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      message: newComment,
      writer: "User",
      writedatetime: new Date().toISOString(),
    };

    setComments((prev) =>
      [...prev, newCommentObj].sort(
        (a, b) =>
          new Date(a.writedatetime).getTime() -
          new Date(b.writedatetime).getTime()
      )
    );
    setNewComment("");
  };

  const handleDelete = () => {
    if (!selectedComment) return;
    setComments((prev) => prev.filter((c) => c.id !== selectedComment.id));
    setSelectedComment(null);
  };

  const handleEdit = (newMessage: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === selectedComment?.id ? { ...c, message: newMessage } : c
      )
    );
    setSelectedComment(null);
  };

  return (
    <div className={styles.container}>
      <h2>Comments</h2>
      <div className={styles.commentsList}>
        {comments.length === 0 ? (
          <p className={styles.emptyMessage}>댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className={styles.commentItem}
              onClick={() => setSelectedComment(comment)}
            >
              <p className={styles.commentText}>{comment.message}</p>
              <div className={styles.commentMeta}>
                <span>{comment.writer}</span>
                <span>{new Date(comment.writedatetime).toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add Comments...."
          className={styles.textareaField}
        />
        <button type="submit" className={styles.submitButton}>
          입력
        </button>
      </form>

      {selectedComment && (
        <Modal
          comment={selectedComment}
          onClose={() => setSelectedComment(null)}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}
