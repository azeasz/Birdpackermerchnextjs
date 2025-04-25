"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/providers/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { getReviews } from "@/lib/data"
import type { Review } from "@/lib/types"
import { Star, ThumbsUp, Flag } from "lucide-react"

interface ProductReviewsProps {
  productId: string
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState("")
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getReviews(productId)
      setReviews(data)
    }

    fetchReviews()
  }, [productId])

  const handleSubmitReview = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to submit a review.",
        variant: "destructive",
      })
      return
    }

    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      })
      return
    }

    if (!newReview.trim()) {
      toast({
        title: "Review Required",
        description: "Please write a review before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate submitting review
    setTimeout(() => {
      const review: Review = {
        id: `review-${Date.now()}`,
        productId,
        userId: user.id,
        userName: user.name,
        userImage: user.image || "",
        rating,
        comment: newReview,
        date: new Date().toISOString(),
        helpfulCount: 0,
      }

      setReviews([review, ...reviews])
      setNewReview("")
      setRating(0)
      setIsSubmitting(false)

      toast({
        title: "Review Submitted",
        description: "Thank you for your review!",
      })
    }, 1000)
  }

  // Calculate rating statistics
  const totalReviews = reviews.length
  const averageRating = totalReviews > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage:
      totalReviews > 0 ? (reviews.filter((review) => review.rating === rating).length / totalReviews) * 100 : 0,
  }))

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1">
          <div className="text-center md:text-left">
            <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center md:justify-start mb-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
            </div>
            <div className="text-sm text-muted-foreground">
              Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="space-y-2">
            {ratingCounts.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center">
                <div className="w-12 text-sm">{rating} stars</div>
                <Progress value={percentage} className="h-2 mx-4 flex-1" />
                <div className="w-12 text-sm text-right">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center mb-2">
              <span className="mr-2">Rating:</span>
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 cursor-pointer ${
                        i < (hoveredRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHoveredRating(i + 1)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(i + 1)}
                    />
                  ))}
              </div>
            </div>
            <Textarea
              placeholder="Share your experience with this product..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              rows={4}
            />
          </div>
          <Button onClick={handleSubmitReview} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No reviews yet. Be the first to review this product!
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={review.userImage} alt={review.userName} />
                      <AvatarFallback>{review.userName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{review.userName}</div>
                      <div className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                  </div>
                </div>
                <p className="mb-4">{review.comment}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <Button variant="ghost" size="sm" className="h-8">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful ({review.helpfulCount})
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8">
                    <Flag className="h-4 w-4 mr-1" />
                    Report
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

