import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCreateResponse, useGetReviewFirst } from '@/apis/hooks'
import { ReviewReplyStartType } from '../../types'
import ReviewReply from './ReviewReply'
import ReceiverSelect from './ReviewSelect'

const ReviewReplyStart = () => {
  const navigate = useNavigate()
  const { pathname, state } = useLocation()
  const reviewId = parseInt(pathname.split('/').at(-1) as string)
  const [reviewStep, setReviewStep] = useState(1)

  const { data: reviewData } = useGetReviewFirst({ id: reviewId })
  const { mutate: createResponse } = useCreateResponse()
  const { title, description, receivers } = reviewData

  const methods = useForm<ReviewReplyStartType>({
    defaultValues: {
      id: state.participationId,
      nonReceiverList: receivers,
    },
  })

  const handleSubmitReply = () => {
    const requestData = {
      id: state.participationId,
      replyTargets: methods.getValues('replyTargets'),
    }

    createResponse(requestData, {
      onSuccess: () => navigate('/'),
    })
  }

  return (
    <div className="flex h-full w-full max-w-[37.5rem] flex-col p-5 text-black">
      <h1 className="text-lg dark:text-white md:text-2xl">{title}</h1>
      {reviewStep === 1 && (
        <p className="mt-2.5 whitespace-pre-wrap text-sm dark:text-white md:text-lg">
          {description}
        </p>
      )}
      <FormProvider {...methods}>
        {reviewStep === 1 && (
          <ReceiverSelect
            setReviewStep={setReviewStep}
            questions={reviewData.questions}
          />
        )}
        {reviewStep === 2 && (
          <ReviewReply
            reviewData={reviewData}
            handleSubmit={handleSubmitReply}
          />
        )}
      </FormProvider>
    </div>
  )
}

export default ReviewReplyStart